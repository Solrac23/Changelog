const prismaClient = require('../database/prismaClient')
const { decrypt } = require('./util/cryptography')
const {AppErros} = require('../errors/appErros')
const jwt = require('jsonwebtoken')

module.exports = {
	async authenticate(req, res){
		const {
			email,
			password
		} = req.body

		if(!email || !password){
			throw new AppErros('Please provide email and password!')
		}
		
		const user = await prismaClient.user.findFirst({
			where:{
				email,
			}
		})
		
		const isValidPassword = await decrypt(password, user.password)
		
		if(!user || !isValidPassword){
			throw new AppErros('Incorrect email or password!', 401)
		}

		const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { 
			expiresIn: process.env.TOKEN_EXPIRES_IN
		})
		
		// delete sensitive data from response object
		delete user.password
		delete user.role
		
		return res.json({ token, user })
	}
	
}
