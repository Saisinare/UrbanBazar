const express = require("express");
const Router = express.Router();
const productController = require('../../controller/user/productController')
const isAuth = require('../../middleware/isAuh')
Router.get('/products',productController.getProducts)
Router.get('/checkout',isAuth,productController.getCheckout)
Router.get('/product/:productId',productController.getProduct)
Router.get('/cart/products',isAuth,productController.getCartProducts)
Router.post('/cart/add/:productId',isAuth,productController.postAddtoCart)
Router.post('/order',isAuth,productController.postOrder)
Router.get('/orders',isAuth,productController.getOrders)
Router.delete('/api/cart/:productId',isAuth,productController.deleteFromCart)
Router.get('/search',productController.getSearchResult)
module.exports = Router;