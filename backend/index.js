const express = require('express')
const app = express() 
const db = require('./db')
const auth = require('./routes/auth')
const cors = require('cors')
const productRoutes = require('./routes/user/products')
const sellerRoutes = require('./routes/seller/product')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const corsOptions = {
    origin:"http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions))
app.use(cookieParser())
dotenv.config()
app.use(express.json())
app.use(auth)
app.use(productRoutes)
app.use('/seller',sellerRoutes)
db.connectDb();
app.listen(process.env.PORT,()=>{
    console.log('server connected')
})
