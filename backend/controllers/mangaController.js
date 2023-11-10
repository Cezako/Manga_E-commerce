import MangaModel from "../models/mangaModel.js"
import formidable from "formidable"
import { identityFile } from "../utils/identityFile.js"
import { copyFiles } from "../utils/copyFiles.js"
import fs from 'fs'


export const getMangasBySerieId = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const getManga = (req, res) => {
    MangaModel.findOne({ _id: req.params.id })
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const addManga = (req, res) => {
    try {
        const form = formidable({multiples: true})

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json(err.message)
            }
            if (!files.images) {
                files.images = []
            } else {
                files.images = Array.isArray(files.images) ? files.images : [files.images]
            }

            const filesName = identityFile(files.images ?? [], '/img/series/mangas')

            const product = new MangaModel({
                serieId: fields.serieId[0],
                title: fields.title[0],
                serialNb: fields.serialNb[0],
                authors: fields.authors,
                illustrators: fields.illustrators,
                genres: fields.genres,
                synopsis: fields.synopsis[0],
                rate: fields.rate[0],
                rateNb: fields.rateNb[0],
                price: fields.price[0],
                quantity: fields.quantity[0],
                isVisible: fields.isVisible[0],
                isAvailable: fields.isAvailable[0],
                images: filesName.map((e) => e.newName)
            })
            product.save()
                .then(async (product) => {
                    await copyFiles(filesName)
                    return res.status(201).json({message: "Manga created successfully", product})
                })
                .catch((err) => res.status(400).json({error: err.message}))
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


export const updateManga = (req, res) => {
    try {
        const form = formidable({multiples: true})

        form.parse(req, async (err, fields, files) => {
            const product = await SerieModel.findById(fields.idToUpdate)
            if (!product) {
                return res.status(400).json({error: "Manga not found"})
            }

            // récupère les anciennes images qu'on filtre avec celles qu'ont veut supprimer. ( deleteImages )
            const images = product.images.filter((e) => !fields.deleteImages?.includes(e))
            
            // Suppression de celle que l'on veut plus
            if (fields.deleteImages) {
                fields.deleteImages.forEach((e) => {
                    product.images.forEach((image, i) => {
                        fs.unlink(`public/${image}`, (err) => {
                            if (err) {
                                if (err.code !== 'ENOENT') {
                                    return res.status(500).json(e)
                                }
                            }
                        })
                    })
                })
            }

            // récuperation des nouvelles images
            const newImages = await identityFile(files.images ?? [], '/img/series/mangas')

            images.push(...newImages.map((e) => e.newName))

            SerieModel.findByIdAndUpdate(fields.idToUpdate, {
                serieId: fields.serieId[0],
                title: fields.title[0],
                serialNb: fields.serialNb[0],
                authors: fields.authors,
                illustrators: fields.illustrators,
                genres: fields.genres,
                synopsis: fields.synopsis[0],
                rate: fields.rate[0],
                rateNb: fields.rateNb[0],
                price: fields.price[0],
                quantity: fields.quantity[0],
                isVisible: fields.isVisible[0],
                isAvailable: fields.isAvailable[0],
                images: images
            }, {new: true})
                .then(async(product) => {
                    await copyFiles(newImages)
                    res.status(201).json({message: "Update products successful", product})
                })
                .catch((err) => res.status(400).json({error: err.message}))
        })
    } catch (e) {
        res.status(400).json(e)
    }
}


export const removeManga = (req, res) => {
    try {
        const {id} = req.params
        MangaModel.findOneAndDelete({_id: id})
            .then((product) => {
                product.images.forEach((image, i) => {
                    fs.unlink(`public/${image}`, (err) => {
                        if (err) throw err
                    })
                })
                return res.status(204).send()
            })
            .catch(() => res.status(500).json({message: 'Error during deletion'}))

    } catch (e) {
        return res.status(500).json({message: 'Error during deletion'})
    }
}