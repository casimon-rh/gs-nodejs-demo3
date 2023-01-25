import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { routes } from './src/controller'


const app: Express = express()
mongoose.Promise = global.Promise
app.use(cors({ origin: '*' }))
app.use(express.json())
const port = process.env.PORT || 3000

routes(app)

app.listen(port, () => console.log(` 🕹 App listening on port ${port}`))