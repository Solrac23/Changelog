const express = require('express')
const router = require('./routes')
const prismaClient = require('./database/prismaClient')
const errorhandler = require('errorhandler')
const helmet = require('helmet')
require('core-js/stable')
require('regenerator-runtime/runtime')
const { errors } = require('celebrate')
const path = require('path')
const app = express()


const db = async function(){
	try {
		await prismaClient.$connect()
		console.log('Database is running!')	
	} catch (e) {
		console.log(e)
		await prismaClient.$disconnect()
		process.exit(1)
	}
}
db()

app.use(helmet({
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
	contentSecurityPolicy: false,
}))
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true, limit: '2026kb' }))
app.use(express.json())
app.use(errorhandler())
app.use(router)
// eslint-disable-next-line no-unused-vars
app.use(errors((err, req, res, _next) => {
	if (err) {
		return res.status(400).json({ message: err.message })
	}

	return res.status(500).json({ message: err })
}))
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', 'public')))

module.exports = app
