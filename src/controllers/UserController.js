import prismaClient from '../database/prismaClient.js'
import { crypt } from './util/cryptography.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async userList(req, res){
		const { page = 1, pageSize = 10} = req.query
		const skip = (page -1) * pageSize

		try {
			const users = await prismaClient.user.findMany({
				select: {
					id: true,
					firstName: true,
					lastName: true,
					username: true,
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
				skip,
				take: parseInt(pageSize)
			})

			const totalCount = await prismaClient.user.count()
			const totalPages = Math.ceil(totalCount / parseInt(pageSize))
			
			res.set({
				'X-Total-Count': totalCount,
				'X-Total-Pages': totalPages,
				'X-Current-Page': page
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
					firstName: true,
					lastName: true,
					username: true,
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
			firstName,
			lastName,
			username,
			email,
			password,
			role,
			companyName,
			uf,
			city
		} = req.body
	
		const pass = crypt(password)
		
		if(!email || !password){
			throw new AppErros('Provide E-mail/pssword!')
		}else if(!username){
			throw new AppErros('Provide username please!')
		}
		
		const userAlreadyExist = await prismaClient.user.findFirst({
			where:{
				OR:[
					{ email },
					{ username }
				],
			},
		})
		

		if(userAlreadyExist){
			throw new AppErros('User already exist!', 409)
		}

		try {
			const user = await prismaClient.user.create({
				data: {
					firstName,
					lastName,
					username,
					email,
					password: pass,
					role,
					company: {
						create:{
							CompanyName: companyName,
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
			firstName,
			lastName,
			username,
			email,
			companyName,
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
					firstName,
					lastName,
					username,
					email, 
					company: {
						update: {
							CompanyName: companyName,
							uf,
							city
						}
					}
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					username: true,
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
