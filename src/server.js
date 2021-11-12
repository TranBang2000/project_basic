import express from 'express'
import {env} from './config/enviroments'
import {connectDB} from './config/mongodb'
import routerV1 from './routes/auth.route'
const bodyParser = require('body-parser')
const app=express()
//connectDB
connectDB()
//app.use
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/auth',routerV1)
//running
app.listen(env.PORT,env.HOST_NAME,()=>{
    console.log(`Running`);
})