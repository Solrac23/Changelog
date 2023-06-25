/* eslint-disable no-undef */
class Formulario {
	constructor() {
		this.form = document.querySelector('form')
		this.btn = document.querySelector('.btn')
		this.email = document.querySelector('input[name=email]')
		this.pass = document.querySelector('input[name=password]')

		this.email.addEventListener('input', this.checkInputs.bind(this))
		this.pass.addEventListener('input', this.checkInputs.bind(this))
		this.form.addEventListener('submit', this.nextPage)
	}
	
	initStyles() {
		this.btn.style.opacity = 0.2
		this.btn.style.cursor = 'default'
		this.btn.style.outlineOffset = '0px'
		this.btn.style.outline = '0px'
		this.btn.style.backgroundColor= '#5587f1'
	}
	
	removeStyles(){
		this.btn.removeAttribute('disabled')
		this.btn.removeAttribute('style')
	}

	async checkInputs() {
		const emailValue = this.email.value.trim()
		const passwordValue = this.pass.value.trim()

		if (emailValue.length > 0 && passwordValue.length > 5) {
			this.removeStyles()
		}else if(emailValue.length === 0 || passwordValue.length < 6) {
			this.initStyles()
		}
	}

	nextPage(e){
		e.stopPropagation()
		window.history.pushState({}, '', '/')
	}
}

const loginForm = new Formulario()
loginForm.initStyles()
