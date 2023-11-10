import express from "express"
import {getSeries, getSerie, addSerie, updateSerie, removeSerie} from "../controllers/serieController.js"
import {getMangasBySerieId, getManga, addManga, updateManga, removeManga} from "../controllers/mangaController.js"
import {getUsers, getUser, removeUser} from "../controllers/userController.js"
import {register} from "../controllers/authController.js"


const router = express.Router()

//Series control
router.get("/series", getSeries)
router.get("/serie/:id", getSerie)
router.post("/add-serie", addSerie)
router.put("/update/serie", updateSerie)
router.delete("/delete/serie/:id", removeSerie)

//Mangas control
router.get("/mangas/:id", getMangasBySerieId)
router.get("/manga/:id", getManga)
router.post("/add-manga", addManga)
router.put("/update/manga", updateManga)
router.delete("/delete/manga/:id", removeManga)

//Users control
router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.delete("/delete/user/:id", removeUser)
router.post("/register", register)


export default router