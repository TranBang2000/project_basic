const mongoose =require('mongoose')
const {env} =require('./enviroments')

export const connectDB= async ()=>{
    try {
        await mongoose.connect(env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        })
        console.log(`Connected successfully`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
// import mongoose from 'mongoose'
// import {env} from './enviroments'
// export const connectDB=async()=>{
//     try {
//         await mongoose.connect(env.MONGO_URI,{
//             useUnifiedTopology: true,
//             useNewUrlParser:true
//         })
//         console.log(`Connected successfully`);
//     } catch (err) {
//         console.log(err);
//         process.exit(1)
//     }
// }