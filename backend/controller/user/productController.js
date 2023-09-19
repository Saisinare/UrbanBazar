const { default: mongoose } = require("mongoose");
const Product = require("../../models/Product");
const User = require("../../models/User");

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
    if(req.query.limit){
      let limit = parseInt(req.query.limit)
      products = await Product.find(filter).limit(limit);
    }else{
      products = await Product.find(filter);
      console.log(products)
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
  const userId = req.userId

  try {
    const user= await User.findById(userId).populate('cart.product');
    res.status(200).json({ cart:user.cart });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddtoCart = async (req, res) => {
  const userId = req.userId;
  const productId = new mongoose.Types.ObjectId(req.params.productId);
  try {
    const user = await User.findById(userId);
    if (user) {
        user.cart.push({product:productId,quantity:0})
        await user.save()
        res.status(200).json({ msg: "Added To Cart" });
        console.log('product added into cart ')
    } else {
      res.status(400).json({ msg: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSearchResult = (req,res)=>{
  const keyword = req.query.keyword 
  console.log(keyword)
  Product.find({
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
      { subcategory: { $regex: keyword, $options: 'i' } },
      { brand: { $regex: keyword, $options: 'i' } },
    ]
  }).then(products=>{
    res.status(200).json({success:true,products:products});
  }).catch(err=>{
    res.status(404).json({success:false,err:err});

  })
}

exports.deleteFromCart = async (req,res)=>{
    const userId = req.userId;
    const productId = new mongoose.Types.ObjectId(req.params.productId)
    try {
        const user = await User.findById(userId);
        if (user) {
            user.cart  = user.cart.filter(product=>{
                return product.product.toString() !== productId.toString() 
            })
            await user.save().then(response=>{
              res.status(200).json({ msg: "deleted From Cart " , cart:user.cart});
            }).catch(err=>{
              console.log(err)
            })
        } else {
          res.status(400).json({ msg: "Not Found" });
        }
      } catch (err) {
        console.log(err);
      }
}
