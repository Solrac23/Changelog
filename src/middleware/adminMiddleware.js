const prismaClient = require('../database/prismaClient')

module.exports = async function adminMiddleware(req, res, next) {
	const {userId} = req
	
	const {role} = await prismaClient.user.findFirst({
		where: {
			id: userId
		},
		select: {
			role: true
		}
	})
	
	if(role){
		return next()
	}

	return res.status(401). json({ error: 'Unauthorized'})
}
