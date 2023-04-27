const prismaClient = require('../database/prismaClient')
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
			return res.status(400).json({error: 'Its email not exist!'})
		}

		if(new_password !== confirm_password){
			return res.status(400).json({ error: 'Password is different!'})
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
			console.error(err)
		}
	},
}
