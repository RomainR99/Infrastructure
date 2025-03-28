import app from './app.js'
import ENV from './config/env.js'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'

const PORT = ENV.PORT || 5173;

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/NodeJSExpress', { userNewUrlParser: true, useUnifiedTopology: true})

const candidatureRoutes = require('./router/candidature.router.js')
app.use('/api/candidatures', candidatureRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Entreprise"})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})