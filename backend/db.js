const mongoose = require('mongoose')
const dbURI  = 'mongodb://127.0.0.1:27017/urbanbazar'

const connectDb = async()=>{
    const db = await mongoose.connect(dbURI)
    if(db){
        console.log("db connected")
    }
    else{
        console.log("some error occure")
    }
} 

module.exports = {connectDb} 