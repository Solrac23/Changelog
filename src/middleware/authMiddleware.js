import jwt from 'jsonwebtoken'
import { AppErros } from '../errors/appErros.js'

export default function authMiddleware(req, res, next){
	const { authorization } = req.headers
	
	if(!authorization){
		throw new AppErros('Token not found!', 401)
	}
	const token = authorization.replace('Bearer', '').trim()

	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded){
			if(err){
				err = {
					name: 'TokenExpiredError',
					message: 'Token expired, please login again!',
				}
				throw new jwt.TokenExpiredError(err.message)
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
