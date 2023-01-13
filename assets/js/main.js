class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector(".formulario")
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('keypress', e => {
            if(e.keyCode == 13){
               teste(e)
            }
        })

        teste = this.formulario.addEventListener("submit", e => {
            e.preventDefault()
            const camposValidos = this.isValid()

            if (camposValidos === true) {
                alert('Formulário enviado!')
                for (let campo of this.formulario.querySelectorAll('input')){
                    campo.value = ''
                }
            }
        })
    }

    isValid() {
        let valid = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let campo of this.formulario.querySelectorAll('input')){
            if(!campo.value) {   
                let fieldName = campo.previousElementSibling.innerText.slice(0, -1)    
                this.criaErro(campo, `O campo "${fieldName}" não foi preenchido.`)  
                valid = false  
            }

            
            if (campo.classList.contains("usuario")) {
                const usuario = campo.value 

                if(usuario.length < 3 || usuario.length > 12) {
                    this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
                    valid = false
                }
                if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
                    this.criaErro(campo, 'Usuário só pode conter letras e/ou números.')
                    valid = false
                }
            }

            if (campo.classList.contains("cpf")) {
                if (tratarCpf(campo.value) !== true) {
                    this.criaErro(campo, 'CPF inválido.')
                    valid = false
                }
            }

            if (campo.classList.contains("senha")) {
                const senha = campo.value  
                if(senha.length < 6 || senha.length > 12) {
                    this.criaErro(campo, 'Senha precisa ter entre 6 e 12 caracteres.')
                    valid = false
                }
            }

            if (campo.classList.contains("repetirSenha")) {
                const senha = this.formulario.querySelector('.senha') 
                if(campo.value !== senha.value) {
                    this.criaErro(campo, 'As senhas são diferentes.')
                    valid = false
                }
            }
        }

        return valid
    }

    criaErro(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new ValidaFormulario()