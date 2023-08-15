const express = require("express");
const Router = express.Router();
const isAuth = require('../../middleware/isAuh')
const userController = require('../../controller/user/userController')

Router.put('/api/user',isAuth,userController.putUser)

Router.get('/api/user',isAuth,userController.getUser)

module.exports = Router
