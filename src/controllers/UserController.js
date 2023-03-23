const prismaClient = require('../database/prismaClient')
const { crypt } = require('./util/cryptography')

module.exports = {
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
		
		if(!email){
			return res.status(400).json({ error: 'Email already exist'})
		}

		if(!password){
			return res.status(400).json({ error: 'Password already exist'})
		}
		
		const userAlreadyExist = await prismaClient.user.findFirst({
			where:{
				email,
			},
		})
		
		if(userAlreadyExist){
			return res.status(409).json({ error: 'User already exist!'})
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
