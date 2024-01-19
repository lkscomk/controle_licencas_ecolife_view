import Vue from 'vue'
import dayjs from 'dayjs'

function cpfValidate (value) {
  if (value) {
    const cpf = String(value).replace(/[^\d]/g, '') // Remove caracteres não numéricos
    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
      return 'CPF deve ter 11 caracteres'
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return 'CPF com digitos iguais'
    }
    // Calcula o primeiro dígito verificador
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let resto = 11 - (soma % 11)
    const digito1 = (resto === 10 || resto === 11) ? 0 : resto
    // Calcula o segundo dígito verificador
    soma = 0
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i)
    }
    resto = 11 - (soma % 11)
    const digito2 = (resto === 10 || resto === 11) ? 0 : resto
    // Verifica se os dígitos verificadores estão corretos
    if (parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2) {
      return false
    }
    return 'CPF não é válido'
  } else return false
}

function emailValidade (email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (regexEmail.test(email)) {
    return false
  } else {
    return 'E-mail inválido'
  }
}

function dataValidade (value) {
  const data = dayjs(value, 'DD/MM/YYYY', true) // O terceiro parâmetro (true) ativa o modo estrito

  if (data.isValid()) {
    return false // A data é válida
  } else {
    return 'Data inválida' // Mensagem de erro
  }
}

Vue.prototype.$cpfValidate = cpfValidate
Vue.prototype.$dataValidade = dataValidade
Vue.prototype.$emailValidade = emailValidade
