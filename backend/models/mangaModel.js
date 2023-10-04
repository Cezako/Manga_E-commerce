import mongoose from "mongoose"

const mangaSchema = new mongoose.Schema({
    
        serieId: {
            type: String,
            required: [true, 'This property "serieId" is required'],
        },
        title: {
            type: String,
            required: [true, 'This property "Title" is required'],
            unique: true,
            message: 'Manga déja existant',
        },
        serialNb: {
            type: Number,
        },
        authors: {
            type: Array,
            required: [true, 'This property "Author" is required'],
        },
        illustrators: {
            type: Array,
            required: [true, 'This property "Illustrators" is required'],
        },
        synopsis: {
            type: String
        },
        rate: {
            type: Number,
            required: [true, 'This property "Rate" is required'],
        },
        rateNb: {
            type: Number,
            required: [true, 'This property "RateNb" required'],
        },
        price: {
            type: Number,
            required: [true, 'This property "Price" is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'This property "Quantity" is required'],
        },
        images: {
            type: Array,
        },
        isAvailable: {
            type: Boolean,
            required: [true, 'This property "isAvailable" is required'],
        },
        isVisible: {
            type: Boolean,
            required: [true, 'This property "isVisible" is required'],
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