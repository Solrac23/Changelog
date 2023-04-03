const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next){
	const { authorization } = req.headers

	if(!authorization){
		return res.sendStatus(401)
	}

	const token = authorization.replace('Bearer', '').trim()

	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded){
			if(err){
				err = {
					name: 'TokenExpiredError',
					message: 'Token expired, please login again!',
				}

				throw new Error(err.message)
			}else {
				return decoded
			}
		})
		
		const {id} = data
		req.userId = id

		return next()
	} catch(err) {
		return res.status(401).send({error: err.message})
	}
}
