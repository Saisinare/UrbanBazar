const express = require("express");
const Router = express.Router();
const productController = require('../../controller/user/productController')
const isAuth = require('../../middleware/isAuh')
Router.get('/products',productController.getProducts)
Router.get('/product/:productId',productController.getProduct)
Router.get('/cart/products',isAuth,productController.getCartProducts)
Router.post('/cart/add/:productId',isAuth,productController.postAddtoCart)
Router.delete('/api/cart/:productId',isAuth,productController.deleteFromCart)

module.exports = Router;