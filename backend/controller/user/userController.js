
const User = require("../../models/User");

exports.getUser = async(req,res)=>{
  const userId = req.userId
  try{
    const user = await User.findById(userId).select('-password -_id -__v')
    if(user){
      res.status(200).json({msg:"User Retrive SuccessFully",user:user})
    }else{
      res.status(404).json({err:"User Not Found"})
    }
  }catch(err){
    console.log(err)
  }
}

exports.putUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findByIdAndUpdate(userId,{isSeller:true});
    if (user) {
        res.status(200).json({msg:"User Updated SuccessFully",user:user})
    } else {
        res.status(200).json({msg:"No User Found"})
    }
} catch (err) {
    res.status(400).json({err:"Updation Failed"})
  }
};
