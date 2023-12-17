import prismaClient from '../database/prismaClient.js'
import { AppErros } from '../errors/appErros.js'
import validateDate from './util/date.js'

export default {
	async index(req, res) {
		const { id } = req.params
		let idToInt = Number(id)

		const findById = await prismaClient.changelog.findFirst({
			where: {
				id: idToInt
			}
		})

		if(!findById){
			throw new AppErros('id not found or already deleted!')
		}
	
		try {
			const oneChangelog = await prismaClient.changelog.findFirst({
				where: {
					id: idToInt,
				},
				select:{
					id: true,
					version: true, 
					date: true,
					category: {
						select: {
							id: true,
							title: true,
							createAt: true,
							updateAt: true,
							categories: {
								select: {
									id: true,
									categoriesName: true,
									createAt: true,
									updateAt: true,
								}
							}
						}
					},
					label: true,
					imagem: true,
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						}
					}
				},
				orderBy: {
					version: 'asc',
				},
			})

			return res.status(200).json(oneChangelog)
		} catch (err) {
			console.error(err)
		}
	},
	async show(req, res) {
		const { page = 1, pageSize = 5} = req.query
		const skip = (page -1) * pageSize

		try {
			const researchChangelog = await prismaClient.changelog.findMany({
				select:{
					id: true,
					version: true, 
					date: true,
					category: {
						select: {
							id: true,
							title: true,
							createAt: true,
							updateAt: true,
							categories: {
								select: {
									id: true,
									categoriesName: true,
									createAt: true,
									updateAt: true,
								}
							}
						}
					},
					label: true,
					imagem: true,
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						}
					}
				},
				orderBy: {
					version: 'asc',
				},
				skip,
				take: parseInt(pageSize)
			})

			const totalCount = await prismaClient.changelog.count()
			const totalPages = Math.ceil(totalCount / parseInt(pageSize))
			
			res.set({
				'X-Total-Count': totalCount,
				'X-Total-Pages': totalPages,
				'X-Current-Page': page
			})

			return res.status(200).json(researchChangelog) 
		} catch (err) {
			console.error(err.message)
		}
		
	},

	async execute(req, res) {
		const {
			version, 
			date,
			title,
			labelName,
		} = req.body

		const {
			originalname: name,
			size,
			key,
			location: path = ''
		} = req.file

		const {userId} = req

		if(!userId){
			throw new AppErros('Id not found or not found!')
		}

		if(!validateDate(date)){ // Valida se data enviada pelo client é menor do que a data atual.
			throw new AppErros('Unable to provide date less than current')
		}

		const versionAlreadyExist = await prismaClient.changelog.findFirst({
			where:{
				version,
			},
			select:{
				version: true
			}
		})

		if(versionAlreadyExist) {
			throw new AppErros('The version already exist!')
		}

		try {

			const changelog = await prismaClient.changelog.create({
				data: {
					version,
					date,
					category: {
						connect:{
							title,
						},
					},
					label: {
						connect: {
							name: labelName,
						}
					},     
					imagem:{
						create: {
							name,
							size,
							key,
							path,
						}
					},
					user: {
						connect: {
							id: userId
						}
					}
				},
			})

			return res.status(201).json(changelog)
		} catch(err) {
			console.error(err.message)
		}
	
	},

	async update(req, res){
		const { id } = req.params
		let idToInt = parseInt(id)

		const {
			version, 
			date,
		} = req.body

		if(!validateDate(date)){ // Valida se data enviada pelo client é menor do que a data atual.
			throw new AppErros('Unable to provide date less than current')
		}

		const alreadyExist = await prismaClient.changelog.findFirst({
			where:{
				id: idToInt
			}
		})

		const versionAlreadyExist = await prismaClient.changelog.findFirst({
			where:{
				version,
			},
			select:{
				version: true
			}
		})

		if(!alreadyExist){
			throw new AppErros('Id not found or already deleted!', 404)
		}

		if(versionAlreadyExist) {
			throw new AppErros('The version already exist!')
		}
		
		try {
			const updateChangelog = await prismaClient.changelog.update({
				where:{
					id:idToInt,
				},
				data:{
					version,
					date,
				}
			})
		
			return res.status(201).json(updateChangelog)
		} catch (err) {
			console.error(err.message)
		}
		
	},

	async destroy(req, res){
		const { id , imageId} = req.params
		let idToInt = parseInt(id)
		
		const alreadyExist = await prismaClient.changelog.findFirst({
			where: {
				id: idToInt
			}
		})

		const imageAlreadyExist = await prismaClient.imagem.findFirstOrThrow({
			where: {
				id: imageId,
			}
		})
		
		if(!alreadyExist){
			throw new AppErros('Id not found or already deleted!', 404)
		}

		if(!imageAlreadyExist){
			throw new AppErros('Id not found or already deleted!', 404)
		}

		try {
			await prismaClient.changelog.delete({
				where: {
					id: idToInt,
				},
			})

			await prismaClient.imagem.delete({
				where: {
					id: imageId,
				}
			})
	
			return res.sendStatus(204)
		} catch (err) {
			console.error(err.message)
		} finally {
			await prismaClient.$disconnect()
		}
	}
}
