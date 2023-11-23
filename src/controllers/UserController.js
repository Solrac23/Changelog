import prismaClient from '../database/prismaClient.js'
import { crypt } from './util/cryptography.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async store(req, res){
		const {
			name,
			email,
			password,
			role,
			nameCompany,
			uf,
			city,
		} = req.body
	
		const pass = crypt(password)
		
		if(!email || !password){
			throw new AppErros('E-mail/pssword incorrect!')
		}
		
		const userAlreadyExist = await prismaClient.user.findFirst({
			where:{
				email,
			},
		})
		
		if(userAlreadyExist){
			throw new AppErros('User already exist!', 409)
		}

		const users = await prismaClient.user.create({
			data: {
				name,
				email,
				password: pass,
				role,
				company:{
					create:{
						nameCompany,
						uf,
						city,
					},
				},
			},
			include: {
				company: true,
			},
		})
		return res.status(201).json(users)
	}
	
}
