require('dotenv').config()
export const env={
    MONGO_URI:process.env.MONGO_URI,
    HOST_NAME:process.env.HOST_NAME,
    PORT:process.env.PORT,
    DATABASE_NAME:process.env.DATABASE_NAME,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
}