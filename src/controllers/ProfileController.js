import prismaClient from '../database/prismaClient.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async show(req, res){
		const {userId} = req

		if(!userId) {
			throw new AppErros('Profile not exist or Id not found.')
		}

		const profile = await prismaClient.user.findFirst({
			where:{
				id: userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				company: true
			}
		})

		return res.status(200).json(profile)
	},

	async updated(req, res){
		const {
			name, 
			email,
			nameCompany,
			uf,
			city
		} = req.body

		const { userId } = req

		if(!userId) {
			throw new AppErros('Profile not exist or Id not found.')
		}

		const updateProfile = await prismaClient.user.update({
			where: {
				id: userId
			},
			data: {
				name,
				email, 
				company: {
					update: {
						nameCompany,
						uf,
						city
					}
				}
			},
			select: {
				name: true,
				email: true,
				company:{
					select: {
						nameCompany: true,
						uf: true,
						city: true
					}
				}
			}
		})

		return res.status(201).json(updateProfile)
	},
	
}
