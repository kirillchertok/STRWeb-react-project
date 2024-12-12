import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './router/router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', router)


const start = () => {
    try {
      app.listen(port, () => console.log(`Listening on port ${port}`))
      mongoose.connect(process.env.DB_URL)
    }
    catch (e) {
      console.error('Error starting server:', error);
    }
}

start()