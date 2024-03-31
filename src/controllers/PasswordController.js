import prismaClient from '../database/prismaClient.js'
import { AppErros } from '../errors/appErros.js'
import {crypt} from './util/cryptography.js'

export default {
	async changePassword(req, res) {
		const {
			emailOrUsername,
			new_password,
			confirm_password
		} = req.body
		let email
		let username

		if(emailOrUsername.includes('@')){
			//Email
			email = emailOrUsername.match(/\w+@/).input
		}else{
			//Usuário
			username = emailOrUsername
		}

		if(!email && !username) {
			throw new AppErros('Provide username please!')
		}

		const user = await prismaClient.user.findFirst({
			where: {
				OR:[
					{ email },
					{ username }
				],
			},
			select: {
				id: true,
				email: true,
				username: true
			}
		})

		if(!user) {
			throw new AppErros('E-mail/username not exist!')
		}

		if(new_password !== confirm_password){
			throw new AppErros('Password is not match!')
		}

		const pass = crypt(new_password)

		try {

			await prismaClient.user.update({
				where: {
					id: user?.id
				},
				data: {
					password: pass,
				},
			})
			return res.sendStatus(204)
		} catch (err) { 
			console.error(err.message)
		}finally{
			await prismaClient.$disconnect()
		}
	},
}
