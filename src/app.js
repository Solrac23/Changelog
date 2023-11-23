import express from 'express'
// const cookieSession = require('cookie-session')
import 'express-async-errors'
import router from './routes.js'
import {connection} from './database/connection.js'
import cors from 'cors'
import morgan from 'morgan'
import { errors } from 'celebrate'

const app = express()

if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
	optionsSuccessStatus: 200,
}))

connection() // Verifica conexao do banco de dados

app.use(express.urlencoded({ extended: true, limit: '2026kb' }))
app.use(express.json())

app.set('trust proxy', 1)
app.disable('x-powered-by')
// let expiryDate = new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 60 * 60 * 1000)
// app.use(cookieSession({
// 	name:'authcookie',
// 	keys:[process.env.SECRET_KEY],
// 	secure: false,
// 	httpOnly: true,
// 	domain: 'localhost',
// 	path: '/auth/login',
// 	expires: expiryDate,
// 	sameSite: 'strict',
// }))
app.use(router)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
	if(err) {
		return res.status(err.statusCode).json({ message: err.message})
	}
	
	return res.status(500).json({ 
		status: 'Error',
		message: `Internal server error${err.message }`
	})
})
// eslint-disable-next-line no-unused-vars
app.use(errors((err, req, res, _next) => {
	if (err) {
		return res.status(400).json({ message: err.message })
	}
	console.log(err.stack)
	return res.status(500).json({ message: err.message })
}))

export {app}
