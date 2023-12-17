import prismaClient from '../database/prismaClient.js'
import { AppErros } from '../errors/appErros.js'

export default {
	async listLabel(req, res){
		try {
			const labels = await prismaClient.label.findMany({
				select: {
					id: true,
					name: true,
					createAt: true,
					updateAt: true,
				}
			})

			return res.status(200).json(labels)
		} catch (error) {
			console.error(error.message)
		}
	},

	async createLabel(req, res){
		const { name } = req.body

		if(!name){
			throw new AppErros('Label not found')
		}
		try {
			const label = await prismaClient.label.create({
				data:{
					name,
				},
			})
			return res.status(201).json(label)
		} catch (err) {
			console.error(err.message)
		}
		
	},

	async editLabel(req, res){
		const {name} = req.body
		const {labelId} = req.params
		let labelIdToInt = Number(labelId)
		
		if(!labelId){
			throw new AppErros('Label id not found')
		}

		try {
			const edit = await prismaClient.label.update({
				where:{
					id: labelIdToInt,
				},
				data:{
					name,
				},
			})

			return res.status(200).json(edit)
		} catch (err) {
			console.error(err.message)
		}
	},
}
