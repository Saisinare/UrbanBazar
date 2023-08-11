const express = require("express");
const Router = express.Router();
const productController = require('../../controller/seller/productController')
const isAuth = require('../../middleware/isAuh')

Router.get('/api/product',isAuth,productController.getProducts)

Router.get('/api/product/:productId',isAuth,productController.getProduct)

Router.post('/api/product',isAuth,productController.postProduct)

Router.put('/api/product/:productId',isAuth,productController.putProduct)

module.exports = Router