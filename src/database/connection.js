import prismaClient from './prismaClient.js'

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

export {connection}
