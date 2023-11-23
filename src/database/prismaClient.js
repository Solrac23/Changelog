import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query'
		}
	],
	errorFormat: 'pretty'
})

prismaClient.$on('query', (e) => {
	console.log(`Query: ${e.query}`)
	console.log(`Params: ${e.params}`)
	console.log(`Duration: ${e.duration}ms`)
})

export default prismaClient
