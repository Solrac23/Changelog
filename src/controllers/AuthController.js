const prismaClient = require('../database/prismaClient')
const { decrypt } = require('./util/cryptography')
const jwt = require('jsonwebtoken')

module.exports = {
	async show(req,res) {
		return res.render('login')
	},
	async authenticate(req, res){
		const {
			email,
			password
		} = req.body

		const user = await prismaClient.user.findFirst({
			where:{
				email,
			}
		})
		
		if(!user){
			return res.sendStatus(401)
		}
		
		const isValidPassword = await decrypt(password, user.password)

		if(!isValidPassword){
			return res.sendStatus(401)
		}

		const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1d'})
		
		delete user.password
		delete user.role

		return res.json({
			user,
			token
		})
	}
	
}
