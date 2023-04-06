const prismaClient = require('../database/prismaClient')

module.exports = {
	async index(req, res) {
		const { id } = req.params
		let idToInt = Number(id)
		try {
			const oneChangelog = await prismaClient.changelog.findFirst({
				where: {
					id: idToInt,
				},
				select: {
					versao: true, 
					date: true,
					descricao: true, 
					major_changes: true, 
					major_changes_check: true,
					changed_features: true,
					changed_features_check: true,
					fix: true,
					fix_check: true
				}
			})
			
			if(!oneChangelog){
				return res.status(400).json({ error: 'id not exist or already deleted!'})
			}

			return res.status(200).json(oneChangelog)
		} catch (err) {
			console.error(err)
		}
	},
	async show(req, res) {
		try {
			const researchChangelog = await prismaClient.changelog.findMany({
				select:{
					id: true,
					versao: true, 
					date: true,
					descricao: true, 
					major_changes: true, 
					major_changes_check: true,
					changed_features: true,
					changed_features_check: true,
					fix: true,
					fix_check: true
				}
			})
			// return res.render('changelog', {researchChangelog})
			return res.status(200).json(researchChangelog) 
		} catch (err) {
			console.error(err)
		}
		
	},

	async execute(req, res) {
		const {
			versao, 
			date,
			descricao, 
			major_changes, 
			major_changes_check,
			changed_features,
			changed_features_check,
			fix,
			fix_check
		} = req.body

		const {userId} = req
		
		const versionAlreadyExist = await prismaClient.changelog.findFirst({
			where:{
				versao,
			},
			select:{
				versao: true
			}
		})

		if(versionAlreadyExist) {
			return res.status(400).json({ error: 'versao already exist!'})
		}

		try {

			const changelog = await prismaClient.changelog.create({
				data: {
					versao,
					date,
					descricao,
					major_changes,
					major_changes_check,
					changed_features,
					changed_features_check,
					fix,
					fix_check,
					user: {
						connect: {
							id: userId
						}
					}
				},
			})

			delete changelog.user_id
			return res.status(201).json(changelog)
		} catch(err) {
			console.error(err.message)
		}
	
	},

	async update(req, res){
		const { id } = req.params
		let idToInt = Number(id)
		const { 
			versao,
			date,
			descricao, 
			major_changes, 
			major_changes_check,
			changed_features,
			changed_features_check,
			fix,
			fix_check
		} = req.body

		const alreadyExist = await prismaClient.changelog.findFirst({
			where:{
				id: idToInt
			}
		})

		if(!alreadyExist){
			return res.status(404).json({error: 'Id not exist or already deleted!'})
		}
		
		const updateChangelog = await prismaClient.changelog.update({
			where:{
				id:idToInt,
			},
			data:{
				versao,
				date,
				descricao, 
				major_changes, 
				major_changes_check,
				changed_features,
				changed_features_check,
				fix,
				fix_check
			}
		})
	
		return res.status(201).json(updateChangelog)
	},

	async destroy(req, res){
		const { id } = req.params
		let idToInt = Number(id)
		
		const alreadyExist = await prismaClient.changelog.findFirst({
			where: {
				id: idToInt
			}
		})
		
		if(!alreadyExist){
			return res.status(404).json({error: 'Id not exist or already deleted!'})
		}

		await prismaClient.changelog.delete({
			where: {
				id: idToInt
			}
			
		})

		return res.status(204).send()
	}
}

