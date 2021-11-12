import express from 'express'
import {env} from './config/enviroments'
import {connectDB} from './config/mongodb'
const app=express()

connectDB()


app.get('/',(req, res) =>{
    res.json(`Hello`)
})
app.listen(env.PORT,env.HOST_NAME,()=>{
    console.log(`Running`);
})