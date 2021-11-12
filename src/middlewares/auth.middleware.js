const jwt = require('jsonwebtoken')
import {env} from '../config/enviroments'


const verifyToken=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    const token=authHeader && authHeader.split(" ")[1]
    if(!token){
      return res.status(401).json({
        success:false,
        message: `Không tìm thấy Token`,
      })
    }
    try {
      const decoded=jwt.verify(token,env.TOKEN_SECRET)
      req._id=decoded._id
      console.log(decoded)
      console.log(decoded._id)
      next()
    } catch (error) {
      return res.status(403).json({
        success:false,
        message: `Token không hợp lệ`,
      })
    }
    // const token=req.cookies.token;
    // jwt.verify(token,env.TOKEN_SECRET,(err,token)=>{
    //   if(token){
    //     AccountModel.findOne({_id:token._id})
    //     .then(data=>{
    //       req.data=data
    //       console.log(token);
    //       next()
    //     })
    //     .catch(err=>res.status(401).json(`Bạn không có quyển truy cập`))
    //   }
    //   else{
    //       res.status(403).json({
    //         success:true,
    //         message: `Không tìm thấy Token`,
    //         err:err
    //       })
    //   }
    // })
  
  }

module.exports=verifyToken