import express from 'express'
import {env} from './config/enviroments'
import {connectDB} from './config/mongodb'
import routerV1 from './routes/auth.route'
import routerV2 from './routes/post.route'
const cookiesParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const app=express()
//connectDB
connectDB()
//app.use
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookiesParser());
//router
app.use('/api/auth',routerV1)
app.use('/api/posts',routerV2)
//running
app.listen(env.PORT,env.HOST_NAME,()=>{
    console.log(`Running`);
})