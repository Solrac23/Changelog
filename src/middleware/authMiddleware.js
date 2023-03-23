const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next){
	const { authorization } = req.headers

	if(!authorization){
		return res.sendStatus(401)
	}

	const token = authorization.replace('Bearer', '').trim()

	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET)
		
		const {id} = data
		req.userId = id

		return next()
	} catch {
		return res.sendStatus(401)
	}
}
