import ENV from './config/env.js'
import express from 'express'
import connectMongoDB from './config/dbMongo.js'
import candidaturesRouter from './router/candidature.router.js'

const app = express()

// IMPORT DES ROUTES

//CONNEXION MONGO
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// MIDLEWARE 
app.use(express.json())

//PRIFIX appelé dans serveur .js
app.use('/api/candidatures',candidaturesRouter);
//app.use('/api/statistiques');

export default app;