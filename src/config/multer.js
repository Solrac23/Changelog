import multer  from 'multer'
import path, {dirname}  from'node:path'
import {fileURLToPath} from 'node:url'
import crypto  from'node:crypto'
import {AppErros}  from'../errors/appErros.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
	dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), //pasta temporaria para armazenar os
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if(err) cb(err)

				file.key = `${hash.toString('hex')}-${file.originalname}`
				cb(null, file.key)
			})
		},
	}),
	limits: {
		fileSize: 5 * 1024 * 1024 // 5MB
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
		]

		if(allowedMimes.includes(file.mimetype)){
			cb(null, true)
		}else{
			cb(new AppErros('Invalid file type.'))
		}

	},
}
