import UserModel from "../models/userModel.js"


export const getUsers = async(req, res) => {
    UserModel.find()
        .then((users) => res.status(200).json({count: users.length, users}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const getUser = async(req, res) => {
    UserModel.findOne()
        .then((users) => res.status(200).json({count: users.length, users}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const getLoggedUser = async(req, res) => {
    
    UserModel.findOne({_id: req.userId})
        .then((users) => res.status(200).json({count: users.length, users}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}


export const removeUser = async(req, res) => {
    const {id} = req.params
    UserModel.findOneAndDelete({_id: id})
        .then((user) => res.status(204).send())
        .catch((err) => res.status(400).json({error: "An error occured"}))
}