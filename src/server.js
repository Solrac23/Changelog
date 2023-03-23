const app = require('./app')

const PORT = Number(process.env.PORT)|| 3355

app.listen(PORT, () => {
	console.log('Server is running http://localhost:' + PORT)
})
