import express from "express"
import * as dotenv from 'dotenv'
import cors from "cors"
import mongoose from "mongoose"

import productRouter from "./router/productRouter.js"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import adminRouter from "./router/adminRouter.js"

import {auth} from "./middleware/auth.js"


dotenv.config( { path: './.env.local' } )

const app = express()
const PORT = process.env.PORT || 5200
const MONGO_URI = process.env.MONGO_DB_URI


app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect(MONGO_URI)
.then(init)
.catch(err => {
    console.log(err.message)
})


async function init() {

    app.use('/products', productRouter)
    app.use('/auth', authRouter)
    app.use('/users', [auth.verifyToken, auth.verifyUser], userRouter)
    app.use('/admin', [auth.verifyToken, auth.verifyIsAdmin], adminRouter)
}


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})