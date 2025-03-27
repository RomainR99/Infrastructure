import mongoose from 'mongoose'

const connectMongoDB = (mongoURI,dbName) => {
    mongoose
        .connect(mongoURI, {dbName: dbName})
        .then(()=> console.log('connexion à mongo réussi'))
        .catch(error=>console.log(error))
}

export default connectMongoDB;