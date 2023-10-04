import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({

        email: {
            type: String,
            required: [true, 'This property Email is required'],
            match: /.+\@.+\..+/,
            unique: true,
            message: 'Utilisateur déja existant',
        },
        password: {
            type: String,
            required: [true, 'This property Password is required']
        },
        username: {
            type: String,
            required: [true, 'This property Username is required'],
            unique: true,
            message: "Nom d'utilisateur déja existant",
        },
        isSubscribed: {
            type: Boolean,
            required: [true, 'This property IsSubscribed is required'],
        },
        isAdmin: {
            type: Boolean,
            required: [true, 'This property IsAdmin is required'],
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)


// HACHAGE MOT DE PASSE
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// ERREUR DE DOUBLONS
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `Le champ '${Object.keys(error.keyValue)[0]}' doit être unique.`
        next(new Error(message))
    } else {
        next(error)
    }
})


// CREATION JWT
userSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.KEY_JWT, {expiresIn: '24h'})
}


// COMPARAISON PASSWORD
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}


export default mongoose.model('User', userSchema)
