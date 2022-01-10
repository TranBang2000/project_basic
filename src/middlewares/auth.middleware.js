const jwt = require('jsonwebtoken')
import { env } from '../config/enviroments'
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({
      success: false,
      message: `Không tìm thấy Token`,
    })
  }
  try {
    const decoded = jwt.verify(token, env.TOKEN_SECRET)
    req._id = decoded._id
    // console.log(decoded)
    // console.log(decoded._id)
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: `Token không hợp lệ`,
    })
  }


}


module.exports = verifyToken