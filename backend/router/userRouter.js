import express from "express"
import {getLoggedUser} from "../controllers/userController.js"


const router = express.Router()


router.get("/profil", getLoggedUser)


export default router