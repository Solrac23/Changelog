const prismaClient = require('./prismaClient')

async function connection(){
	try {
		await prismaClient.$connect()
		console.log('Database is running!')	
	} catch (e) {
		await prismaClient.$disconnect()
		console.log(e)
		process.exit(1)
	}
}

module.exports = Object.freeze({connection})
