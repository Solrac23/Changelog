import {server} from './app.js'

const PORT = Number(process.env.PORT)|| 3355

server.listen(PORT, () => {
	console.log('Server is running http://localhost:' + PORT)
})
