import mongoose from 'mongoose'

const candidatureShema = mongoose.Schema(
    {
        entreprise: {
            type: String,
            minLength: 3,
            required: true
        },
        status: {
            type: String,
            enum: ['en attente','accepter','refuser'],
            default: 'en attente'
        },
    },{
        timestamps: true
    }
)

export default mongoose.model('candidatures', candidatureShema)