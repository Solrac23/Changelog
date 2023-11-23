import bcrypt from 'bcryptjs'

function crypt(pass){
	return bcrypt.hashSync(pass, 8)
}

function decrypt(pass, passToDATABASE){
	return bcrypt.compare(pass, passToDATABASE)
}

export {crypt, decrypt}
