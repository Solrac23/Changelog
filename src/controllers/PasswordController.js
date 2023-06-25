const prismaClient = require('../database/prismaClient')
const { AppErros } = require('../errors/appErros')
const {crypt} = require('./util/cryptography')

module.exports = {
	show(req, res) {
		return res.render('password')
	},
	async changePassword(req, res) {
		const {
			email,
			new_password,
			confirm_password
		} = req.body

		if(!email) {
			return res.sendStatus(400)
		}

		const user = await prismaClient.user.findFirst({
			where: {
				email,
			},
			select: {
				email: true
			}
		})

		if(!user) {
			throw new AppErros('E-mail not exist!')
		}

		if(new_password !== confirm_password){
			throw new AppErros('Password is not match!')
		}

		const pass = crypt(new_password)

		try {

			await prismaClient.user.update({
				where: {
					email,
				},
				data: {
					password: pass,
				}
			})
			return res.sendStatus(204)
		} catch (err) {
			console.error(err.message)
		}
	},
}
