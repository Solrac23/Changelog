import prismaClient from '../database/prismaClient.js'
import { crypt } from './util/cryptography.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async userList(req, res){
		try {
			const users = await prismaClient.user.findMany({
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					company: {
						select: {
							id_company: true,
							CompanyName: true,
							uf: true,
							city: true,
						}
					}
				},
			})

			return res.status(200).json(users)
		} catch (err) {
			console.warn(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
	},

	async show(req, res){
		const {userId} = req

		if(!userId) {
			throw new AppErros('Profile not exist or Id not found.')
		}

		try{
			const userProfile = await prismaClient.user.findFirst({
				where:{
					id: userId,
				},
				select: {
					id: true,
					name: true,
					email: true,
					createAt: true,
					updateAt: true,
					company: true
				}
			})
	
			return res.status(200).json(userProfile)
		}catch(err){
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
		
	},

	async store(req, res){
		const {
			name,
			email,
			password,
			role,
			CompanyName,
			uf,
			city
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

		try {
			const user = await prismaClient.user.create({
				data: {
					name,
					email,
					password: pass,
					role,
					company: {
						create:{
							CompanyName,
							uf,
							city,
						},						
					}
				},
				include: {
					company: true,
				},
			})

			delete user.password
			delete user.role

			return res.sendStatus(201)
		} catch (err) {
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
	
	},
	async updated(req, res){
		const {
			name, 
			email,
			CompanyName,
			uf,
			city
		} = req.body

		const { userId } = req

		if(!userId) {
			throw new AppErros('Profile not exist or Id not found.')
		}

		try {
			const updateUser = await prismaClient.user.update({
				where: {
					id: userId
				},
				data: {
					name,
					email, 
					company: {
						update: {
							CompanyName,
							uf,
							city
						}
					}
				},
				select: {
					id: true,
					name: true,
					email: true,
					company: true,
				}
			})
	
			return res.status(201).json(updateUser)
		} catch (err) {
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
	},

	async deleteUser(req, res){
		const {userId} = req.params

		const userAlreadyExist = await prismaClient.user.findFirst({
			where: {
				id: userId,
			}
		})

		if(!userAlreadyExist){
			throw new AppErros('Id not found or already deleted!', 404)
		}

		try {
			await prismaClient.user.delete({
				where: {
					id: userId,
				},
			})
	
			return res.sendStatus(204)
		} catch (err) {
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
		
	},
	
}
