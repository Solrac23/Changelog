/* eslint-disable no-undef */
let btnPassword = document.querySelector('.btn-password')
btnPassword.style.opacity = 0.5
btnPassword.style.backgroundColor = '#eee'


// function validateInput() {
// 	let email = document.querySelector('input[name=email]')
// }
let email = document.querySelector('input[name=email]')
email.addEventListener('keydown', (e) => {
	e.innerHTML= ''
})
if (email.value.length > 0) {
	btnPassword.style.opacity = 1
}

let new_password = document.querySelector('input[name=new_password]')
new_password.addEventListener('keypress', () => {
	return new_password.value
})

let confirm_password = document.querySelector('input[name=confirm_password]')
confirm_password.addEventListener('keypress', (e) => {
	e.innerHTML = ''
	return confirm_password.value.length
})

// fetch('http://localhost:3356/login')
// 	.then((respose) => {
// 		console.log(respose.headers)
// 	})
// 	.catch(err => console.error(err))
