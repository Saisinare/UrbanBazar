const express = require("express");
const Router = express.Router();
const productController = require('../../controller/seller/productController')
const isAuth = require('../../middleware/isAuh')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});

const upload = multer({storage:storage})

Router.get('/api/products',isAuth,productController.getProducts)

Router.get('/api/product/:productId',isAuth,productController.getProduct)

Router.post('/api/product',isAuth,upload.single('image'),productController.postProduct)

Router.put('/api/product/:productId',isAuth,productController.putProduct)

module.exports = Router