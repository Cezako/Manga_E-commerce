import SerieModel from "../models/serieModel.js"
import formidable from "formidable"
import { identityFile } from "../utils/identityFile.js"
import { copyFiles } from "../utils/copyFiles.js"
import fs from 'fs'


export const getSeries = (req, res) => {
    SerieModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const getSerie = (req, res) => {
    SerieModel.findOne({ _id: req.params.id })
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const getSearchedSeries = (req, res) => {

    const { search } = req.query
    const query = search ? { $text: { $search: search } } : {}

    SerieModel.find(query)
        .then((products) => res.status(200).json({ count: products.length, products }))
        .catch((err) => res.status(400).json({ error: "An error occurred" }))
}


export const addSerie = (req, res) => {
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

            const filesName = identityFile(files.images ?? [], '/img/series')

            const product = new SerieModel({
                title: fields.title[0],
                voTitle: fields.voTitle[0],
                authors: fields.authors,
                illustrators: fields.illustrators,
                type: fields.type[0],
                genres: fields.genres,
                synopsis: fields.synopsis[0],
                vfEditors: fields.vfEditors,
                pegi: fields.pegi[0],
                rate: fields.rate[0],
                rateNb: fields.rateNb[0],
                isEnded: fields.isEnded[0],
                isVisible: fields.isVisible[0],
                images: filesName.map((e) => e.newName)
            })
            product.save()
                .then(async (product) => {
                    await copyFiles(filesName)
                    return res.status(201).json({message: "Serie created successfully", product})
                })
                .catch((err) => res.status(400).json({error: err.message}))
        })
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


export const updateSerie = (req, res) => {
    try {
        const form = formidable({multiples: true})

        form.parse(req, async (err, fields, files) => {
            const product = await SerieModel.findById(fields.idToUpdate)
            if (!product) {
                return res.status(400).json({error: "Serie not found"})
            }

            // récupère les anciennes images qu'on filtre avec celles qu'ont veut supprimer. ( deleteImages )
            const images = product.images.filter((e) => !fields.deleteImages?.includes(e))
            
            // Suppression de celle que l'on veut plus
            if (fields.deleteImages) {
                fields.deleteImages.forEach((image) => {
                    fs.unlink(`public/${image}`, (err) => {
                        if (err) {
                            if (err.code !== 'ENOENT') {
                                return res.status(500).json(e)
                            }
                        }
                    })
                })
            }

            // récuperation des nouvelles images
            const newImages = await identityFile(files.images ?? [], '/img/series')

            images.push(...newImages.map((e) => e.newName))

            SerieModel.findByIdAndUpdate(fields.idToUpdate, {
                title: fields.title[0],
                voTitle: fields.voTitle[0],
                authors: fields.authors,
                illustrators: fields.illustrators,
                type: fields.type[0],
                genres: fields.genres,
                synopsis: fields.synopsis[0],
                vfEditors: fields.vfEditors,
                pegi: fields.pegi[0],
                rate: fields.rate[0],
                rateNb: fields.rateNb[0],
                isEnded: fields.isEnded[0],
                isVisible: fields.isVisible[0],
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


export const removeSerie = (req, res) => {
    try {
        const {id} = req.params
        SerieModel.findOneAndDelete({_id: id})
            .then((product) => {
                product.images.forEach((image, i) => {
                    fs.unlink(`public/${image}`, (err) => {
                        if (err) {
                            if (err.code !== 'ENOENT') {
                                return res.status(500).json(e)
                            }
                        }
                    })
                })
                return res.status(204).send()
            })
            .catch(() => res.status(500).json({message: 'Error during deletion'}))

    } catch (e) {
        return res.status(500).json({message: 'Error during deletion'})
    }
}