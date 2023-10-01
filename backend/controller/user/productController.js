const { default: mongoose } = require("mongoose");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Order = require("../../models/Order");
const dotenv = require("dotenv");
const { default: Stripe } = require("stripe");
const moment = require("moment");
dotenv.config();
const Strip = require("stripe")(process.env.STRIP_PRIVATE_KEY);

exports.getProducts = async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.minPrice) {
    filter.price = { $gte: parseInt(req.query.minPrice) };
  }
  if (req.query.maxPrice) {
    if (filter.price) {
      filter.price.$lte = parseInt(req.query.maxPrice);
    } else {
      filter.price = { $lte: parseInt(req.query.maxPrice) };
    }
  }
  try {
    let products;
    if (req.query.limit) {
      let limit = parseInt(req.query.limit);
      products = await Product.find(filter).limit(limit);
    } else {
      products = await Product.find(filter);
      console.log(products);
    }
    res.status(200).json({ products: products });
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    res.status(200).json({ products: product });
  } catch (err) {
    console.log(err);
  }
};

exports.getCartProducts = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("cart.product");
    let totalPrice = 0,
      productsPrice = 0,
      tax = 0,
      deliveryCharges = 0;
    user.cart.forEach((item) => {
      productsPrice += item.product.price * item.quantity;
      tax += ((item.product.price * 5) / 100) * item.quantity;
      deliveryCharges += 45 * item.quantity;
      totalPrice = productsPrice + tax + deliveryCharges;
    });
    res.status(200).json({
      cart: user.cart,
      productsPrice: productsPrice,
      tax: tax,
      deliveryCharges: deliveryCharges,
      totalPrice: totalPrice,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddtoCart = async (req, res) => {
  const userId = req.userId;
  const productId = new mongoose.Types.ObjectId(req.params.productId);
  try {
    const user = await User.findById(userId);
    let isExist = false;
    let itemIndex;
    if (user) {
      user.cart.forEach((item, index) => {
        if (item.product._id.toString() == productId.toString()) {
          isExist = true;
          itemIndex = index;
          return;
        }
      });
      console.log(isExist);
      if (isExist) {
        user.cart[itemIndex].quantity += 1;
        console.log("exist");
      } else {
        console.log("product not exist");
        user.cart.push({ product: productId, quantity: 1 });
      }
      await user.save();
      res.status(200).json({ msg: "Added To Cart" });
      console.log("product added into cart ");
    } else {
      res.status(400).json({ msg: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSearchResult = (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
  Product.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { subcategory: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
    ],
  })
    .then((products) => {
      res.status(200).json({ success: true, products: products });
    })
    .catch((err) => {
      res.status(404).json({ success: false, err: err });
    });
};

exports.deleteFromCart = async (req, res) => {
  const userId = req.userId;
  const productId = new mongoose.Types.ObjectId(req.params.productId);
  try {
    const user = await User.findById(userId);
    if (user) {
      user.cart = user.cart.filter((product) => {
        return product.product.toString() !== productId.toString();
      });
      await user
        .save()
        .then((response) => {
          res.status(200).json({ msg: "deleted From Cart ", cart: user.cart });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(400).json({ msg: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getCheckout = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("cart.product");
    const items = [];
    const productPromises = user.cart.map(async (item) => {
      const product = await Strip.products.create({
        name: item.product.title,
        description: item.product.description[0],
      });
      console.log("product id info ");
      let productprice = parseInt(item.product.price);
      const id = item.product._id.toString();
      console.log(id);
      const price = await Strip.prices.create({
        product: product.id,
        metadata: { productId: item.product._id.toString(),orderType:'cart' },
        unit_amount: parseInt(productprice) * 100,
        currency: "inr",
      });
      items.push({ price: price.id, quantity: item.quantity });
      console.log(item.product);
    });
    const productResult = await Promise.all(productPromises);

    console.log(items);

    const session = await Strip.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/success`,
      cancel_url: "http://localhost:3000/fail",
    });

    res.json({ url: session.url, session_id: session.id });
  } catch (err) {
    console.log(err);
  }
};

exports.postOrder = async (req, res) => {
  const sessionId = req.body.sessionId;
  const session = await Strip.checkout.sessions.retrieve(sessionId);
  const items = await Strip.checkout.sessions.listLineItems(sessionId);

  if (session.status == "complete") {
    const dateNow = Date.now();
    const deliveredDate = new Date();
    deliveredDate.setDate(deliveredDate.getDate() + 4);

    const date = moment(dateNow).format();
    let products = [];
    items.data.forEach((product) => {
      products.push({ product: product.price.metadata.productId,type:product.price.metadata.orderType });
    });

    console.log(products);

    const isOrdered = await Order.find({ session: sessionId });
    if (isOrdered.length !== 0) {
      return res.json({ msg: "already ordered" });
    } else {
      const newOrder = new Order({
        customer: req.userId.toString(),
        items: products,
        totalAmount: session.amount_total,
        orderDate: date,
        Status: "pending",
        ShipppingDate:deliveredDate,
        session: sessionId,
        paymentStatus:'paid',
        type:products[0].type
      });

      const result = await newOrder.save();
      if (result) {
        res.json({ success: true, result: result });
      } else {
        res.json({ success: false, err: "unable to create a order" });
      }
    }
  }
};

exports.getOrders = async(req,res)=>{
  const userId = req.userId
  const orders = await Order.find({customer:userId}).populate('items.product')
  if(orders.length == 0){
   return res.json({success:true,isOrderEmpty:true,msg:'No Orders Yet'})
  }
  console.log(orders)
  res.json({success:true,isOrderEmpty:false, orders:orders});
}