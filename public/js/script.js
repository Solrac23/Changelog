/* eslint-disable no-undef */
// let btn = document.querySelector('.btn')

// btn.addEventListener('keydown', (e) => {
// 	e.defaultPrevented
	
// 	if(e.key === 'ENTER') return document.links.
// })

let btnPassword = document.querySelector('.btn-password')
btnPassword.style.opacity = 0.5
btnPassword.style.backgroundColor = '#eee'

let email = document.querySelector('input[name=email]')
let new_password = document.querySelector('input[name=new_password]').value
let confirm_password = document.querySelector('input[name=confirm_password]').value

email.addEventListener('keypress', (e) => {
	// e.preventDefault()
	e.innerHTML = ''
	console.log(email.value.length)
})
