import UserModel from "../models/userModel.js"


export const getUsers = async(req, res) => {

    const users = await UserModel.find()
    res.status(200).json(users)
}


export const getUser = async(req, res) => {
    
    const user = await UserModel.findOne({_id: req.params.id})
    res.status(200).json(user)
}


export const getLoggedUser = async(req, res) => {

    const user = await UserModel.findOne({_id: req.userId})
    res.status(200).json(user)
}


export const deleteUser = async(req, res) => {

    const user = await UserModel.findOne({_id: req.params.id})
    res.status(200).json(user)
}