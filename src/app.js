import express from 'express'
import ENV from '../../config/env.js'
import connectMongoDB from '../../config/dbMongo.js'
import candidatureRouteur from './router/candidature.router.js'


const app = express()
// import des routes 


// connexion a mongo
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// middleware


//prifix
app.use('/api/candidature', candidatureRouteur);
//app.use('/api/statistique');

export default app;