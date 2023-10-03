import express from "express"
import {getSeries, getSerie, addSerie, updateSerie, removeSerie} from "../controllers/serieController.js"
import {getMangasBySerieId, getManga, addManga, updateManga, removeManga} from "../controllers/mangaController.js"
import {getUsers} from "../controllers/userController.js"


const router = express.Router()

//Series control
router.get("/series", getSeries)
router.get("/serie/:id", getSerie)
router.post("/add-serie", addSerie)
router.put("/update/serie/:id", updateSerie)
router.delete("/delete/serie/:id", removeSerie)

//Mangas control
router.get("/mangas/:id", getMangasBySerieId)
router.get("/manga/:id", getManga)
router.post("/add-manga", addManga)
router.put("/update/manga/:id", updateManga)
router.delete("/delete/manga/:id", removeManga)

//Users control
router.post("/", getUsers)


export default router