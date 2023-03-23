const bcryptjs = require('bcryptjs')

function crypt(pass){
	return bcryptjs.hashSync(pass, 8)
}

function decrypt(pass, passToDATABASE){
	return bcryptjs.compare(pass, passToDATABASE)
}

module.exports = {crypt, decrypt}
