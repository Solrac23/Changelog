import prismaClient from '../database/prismaClient.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async listCotegories(req, res) {
		try{
			const categories = await prismaClient.category.findMany({
				select:{
					id: true,
					title: true,
					createAt: true,
					updateAt: true,
					categories: {
						select: {
							id: true,
							categoriesName: true,
							createAt: true,
							updateAt: true
						}
					}
				},
				orderBy:{
					id: 'asc'
				},
			})

			return res.status(200).json(categories)
		}catch(err) {
			throw new AppErros('Error to get categories', 401)
		}
	},
	async createCategories(req, res){
		const {title, categories_name} = req.body
		const {userId} = req

		if(!userId){
			throw new AppErros('User not found.', 404)
		}

		if(!title && !categories_name){
			throw new AppErros('Insira um titulo e uma categoria')
		}

		try{
			const create = await prismaClient.categories.create({
				select:{
					id: true,
					categoriesName: true,
					createAt: true,
					updateAt: true,
					category: true,
				},
				data: {
					categoriesName: categories_name,
					category:{
						create:{
							title,
						}
					},
				},	
			})

			return res.status(201).json(create)
		}catch(err){
			console.error(err.message)
		}
	},

	async editCategories(req, res){
		const {
			title, 
			categories_name
		} = req.body

		const {
			categorieId,
			categoryId
		} = req.params

		let categorieIdToInt = parseInt(categorieId)
		let categoryIdToInt = parseInt(categoryId)

		try {
			const editCategoryAndCategories = await prismaClient.categories.update({
				where: {
					id: categorieIdToInt,
					AND: [
						{
							categoryId: {
								equals: categoryIdToInt
							}
						}
					]
				},
				data: {
					category: {
						update: {
							title,
						},
					},
					categoriesName: categories_name,
				},
				select: {
					category: {
						select: {
							id: true,
							title: true,
							createAt: true,
							updateAt: true,
						},
					},
					id: true,
					categoriesName: true,
					createAt: true,
					updateAt: true
				}
			})

			return res.status(200).json(editCategoryAndCategories)
		} catch (err) {
			console.error(err.message)
		}
	},

}
