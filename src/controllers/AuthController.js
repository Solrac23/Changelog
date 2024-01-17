import prismaClient from '../database/prismaClient.js'
import { decrypt } from './util/cryptography.js'
import {AppErros} from '../errors/appErros.js'
import jwt from 'jsonwebtoken'

export default {
	async authenticate(req, res){
		const {
			email,
			password
		} = req.body

		if(!email || !password){
			throw new AppErros('Please provide email and password!')
		}

		try {
			const user = await prismaClient.user.findFirst({
				where:{
					email,
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					role: true,
					company: true
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
			
			return res.json({ token, user })
		} catch (err) {
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
		
	}
	
}
