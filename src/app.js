import express from 'express'
import {createServer} from 'node:http'
import path, {dirname} from 'node:path'
import { fileURLToPath } from 'node:url'
import 'express-async-errors'
import router from './routes.js'
import {connection} from './database/connection.js'
import cors from 'cors'
import morgan from 'morgan'
import { AppErros } from './errors/appErros.js'

const app = express()
const server = createServer(app)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
	optionsSuccessStatus: 200,
	credentials: true
}))

connection() // Verifica conexao do banco de dados

app.use(express.urlencoded({ extended: true, limit: '2026kb' }))
app.use(express.json())

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
	if(err instanceof AppErros) {
		return res.status(err.statusCode).json({ message: err.message})
	}
	
	return res.status(500).json({ 
		status: 'Error',
		message: `Internal server error ${err.message }`
	})
})

export {server}
