import MangaModel from "../models/mangaModel.js"
import formidable from "formidable"
import path from 'path'


export const getMangasBySerieId = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const getManga = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const addManga = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const updateManga = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const removeManga = (req, res) => {
    MangaModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}