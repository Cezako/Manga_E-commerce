import express from "express"
import {getSeries, getSerie, getSearchedSeries} from "../controllers/serieController.js"
import {getMangasBySerieId, getManga} from "../controllers/mangaController.js"


const router = express.Router()

router.get("/series", getSeries)
router.get("/series/search/", getSearchedSeries)
router.get("/serie/:id", getSerie)

router.get("/mangas/:id", getMangasBySerieId)
router.get("/manga/:id", getManga)


export default router