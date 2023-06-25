const prismaClient = require('../database/prismaClient')
const { AppErros } = require('../errors/appErros')
module.exports = async function adminMiddleware(req, res, next) {
	const {userId} = req
	
	if(!userId){
		throw new AppErros('Id not exist or not found!')
	}
	
	const {role} = await prismaClient.user.findFirst({
		where: {
			id: userId
		},
		select: {
			role: true
		}
	})
	
	if(role !== 'USER'){
		return next()
	}

	return res.status(401). json({ error: 'Unauthorized'})
}
