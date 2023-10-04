import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"


const verifyToken = (req, res, next) => {

    let token
    
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
    }
    if (!token) {
        return res.status(403).send({message: "No token provided!"})
    }

    jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!"})
        }
        
        console.log(decoded)
        req.userId = decoded.id
        next()
    })
}


const verifyIsAdmin = (req, res, next) => {
    UserModel.findOne({_id: req.userId})
        .then((user) => {
            if(user.isAdmin){
                next()
            } else {
                return res.status(401).send({message: "T'es pas admin!"})
            }
        })
        .catch((err) => res.status(401).send({message: "T'existe pas!"}))
}


const verifyUser = (req, res, next) => {
    UserModel.findOne({ _id: req.userId })
        .then((user) => {
            if (user) {
                next()
            } else {
                return res.status(401).send({ message: "Unauthorized!" })
            }
        })
        .catch((err) => res.status(401).send({ message: "User not found" }))
}


export const auth = { verifyToken, verifyIsAdmin, verifyUser }