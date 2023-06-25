const prismaClient = require('../database/prismaClient')
const { AppErros } = require('../errors/appErros')

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
					version: true, 
					date: true,
					description: true, 
					major_changes: true, 
					major_changes_check: true,
					changed_features: true,
					changed_features_check: true,
					fix: true,
					fix_check: true
				}
			})
			if(!oneChangelog){
				throw new AppErros('id not found or already deleted!')
			}

			return res.status(200).json(oneChangelog)
		} catch (err) {
			console.error(err)
		}
	},
	async show(req, res) {
		console.log(req.session.token)
		try {
			const researchChangelog = await prismaClient.changelog.findMany({
				select:{
					id: true,
					version: true, 
					date: true,
					description: true, 
					major_changes: true, 
					major_changes_check: true,
					changed_features: true,
					changed_features_check: true,
					fix: true,
					fix_check: true
				},
				orderBy: {
					version: 'asc',
				},
			})
			return res.status(200).json(researchChangelog) 
			// return res.render('changelog', {researchChangelog})
		} catch (err) {
			console.error(err.message)
		}
		
	},

	async execute(req, res) {
		const {
			version, 
			date,
			description, 
			major_changes, 
			major_changes_check,
			changed_features,
			changed_features_check,
			fix,
			fix_check
		} = req.body

		const {userId} = req

		if(!userId){
			throw new AppErros('Id not found or not found!')
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
			throw new AppErros('versao already exist!')
		}

		try {

			const changelog = await prismaClient.changelog.create({
				data: {
					version,
					date,
					description,
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
			version,
			date,
			description, 
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
			throw new AppErros('Id not found or already deleted!', 404)
		}
		
		try {
			const updateChangelog = await prismaClient.changelog.update({
				where:{
					id:idToInt,
				},
				data:{
					version,
					date,
					description, 
					major_changes, 
					major_changes_check,
					changed_features,
					changed_features_check,
					fix,
					fix_check
				}
			})
		
			return res.status(201).json(updateChangelog)
		} catch (err) {
			console.error(err.message)
		}
		
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
			throw new AppErros('Id not found or already deleted!', 404)
		}

		await prismaClient.changelog.delete({
			where: {
				id: idToInt
			}
			
		})

		return res.sendStatus(204)
	}
}

