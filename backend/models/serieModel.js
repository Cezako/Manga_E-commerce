import mongoose from "mongoose"

const serieSchema = new mongoose.Schema({
    
        title: {
            type: String,
            required: [true, 'This property "Title" is required'],
            unique: true,
            message: 'Serie déja existante',
        },
        voTitle: {
            type: String,
        },
        authors: {
            type: Array,
            required: [true, 'This property "Author" is required'],
        },
        illustrators: {
            type: Array,
            required: [true, 'This property "Illustrators" is required'],
        },
        type: {
            type: String,
            required: [true, 'This property "Type" is required'],
        },
        genres: {
            type: Array,
        },
        synopsis: {
            type: String
        },
        vfEditors: {
            type: Array,
            required: [true, 'This property "Editor" is required'],
        },
        pegi: {
            type: Number
        },
        rate: {
            type: Number,
            required: [true, 'This property Rate is required'],
        },
        rateNb: {
            type: Number,
            required: [true, 'This property "RateNb" required'],
        },
        images: {
            type: Array,
        },
        isEnded: {
            type: Boolean,
            required: [true, 'This property is required'],
        },
        isVisible: {
            type: Boolean,
            required: [true, 'This property is required'],
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


// ERREUR DE DOUBLONS
serieSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `Le champ '${Object.keys(error.keyValue)[0]}' doit être unique.`
        next(new Error(message))
    } else {
        next(error)
    }
})

export default mongoose.model('Serie', serieSchema)