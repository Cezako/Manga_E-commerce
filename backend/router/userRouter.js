import express from "express"
import {getLoggedUser} from "../controllers/userController.js"


const router = express.Router()

router.post("/", getLoggedUser)


export default router