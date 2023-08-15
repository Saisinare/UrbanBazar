
const Product = require("../../models/Product");


exports.getProducts = async (req, res) => {
  const userId = req.userId;
  try {
    const products = await Product.find({ seller: userId });
    if (products) {
      res.status(200).json({ products: products });
    } else {
      res.status(400).json({ err: "unable to get products " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if(product.seller!=req.userId){
        return res.status(402).json({err:"Unauthorized access"})
    }
    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ err: "unable to get product " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postProduct = async (req, res) => {
  const userId = "64c5ddb327a13259a836ef54";
  const image = req.file.filename
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    image: image,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    seller: userId,
    brand: req.body.brand,
    product_quantity: req.body.product_quantity,
  });

  try {
    const result = await product.save();
    if (result) {
      res
        .status(200)
        .json({ msg: "Product Inserted SuccessFully", product: result });
    } else {
      res.status(400).json({ err: "Product Not Inserted SuccessFully" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.putProduct = async (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = {};

  if (req.body.title) updatedProduct.title = req.body.title;
  if (req.body.description) updatedProduct.description = req.body.description;
  if (req.body.price) updatedProduct.price = req.body.price;
  if (req.body.image) updatedProduct.image = req.body.image;
  if (req.body.category) updatedProduct.category = req.body.category;
  if (req.body.subcategory) updatedProduct.subcategory = req.body.subcategory;
  if (req.body.brand) updatedProduct.brand = req.body.brand;
  if (req.body.product_quantity) updatedProduct.product_quantity = req.body.product_quantity;

  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct);
    if (product) {
        if(product.seller!=req.userId){
            return res.status(402).json({err:"unauthorized access"})
        }
      res
        .status(200)
        .json({ msg: "product updated successfully", product: product });
    } else {
      res.status(400).json({ err: "unable to update Product" });
    }
  } catch (err) {
    console.log(err);
  }
};
