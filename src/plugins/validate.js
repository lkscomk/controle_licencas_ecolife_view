/* eslint-disable  */

import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import{ email, length, max, max_value, min, min_value, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import dayjs from 'dayjs'

extend('email', {
  ...email,
  message: 'O campo {_field_} não é um email válido'
})
extend('length', {
  ...length,
  message: 'O campo {_field_} deve ter {length} caracteres'
})
extend('numeric', {
  ...numeric,
  message: 'O campo {_field_} requer somente números'
})
extend('required', {
  ...required,
  message: 'O campo {_field_} é obrigatório'
})

extend('max', {
  ...max,
  message: (campo, valor) => {
    return `Valor máximo para ${campo} é: ${valor.length}`
  }
})

extend('min', {
  ...min,
  message: (campo, valor) => {
    return `Valor mínimo para ${campo} é: ${valor.length}`
  }
})

extend('max_value', {
  ...max_value,
  message: 'Valor máximo para {_field_} é: {max}'
})

extend('min_value', {
  ...min_value,
  message: 'Valor mínimo para {_field_} é: {min}'
})

extend('data', {
    validate: (value) => {
      const data = dayjs(value, 'DD/MM/YYYY', true); // O terceiro parâmetro (true) ativa o modo estrito

      // Verifica se a data é válida
      if (data.isValid()) {
        return true; // A data é válida
      } else {
        return '{_field_} não é uma data válida'; // Mensagem de erro
      }
    }
});

extend('cpf', value => {
  if (value) {
    let cpf = String(value).replace(/[^\d]/g, '') // Remove caracteres não numéricos
    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return '{_field_} deve ter 11 caracteres'
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return '{_field_} com digitos iguais'
    }
    // Calcula o primeiro dígito verificador
    let soma = 0
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let resto = 11 - (soma % 11)
    let digito1 = (resto === 10 || resto === 11) ? 0 : resto
    // Calcula o segundo dígito verificador
    soma = 0
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i)
    }
    resto = 11 - (soma % 11)
    let digito2 = (resto === 10 || resto === 11) ? 0 : resto
    // Verifica se os dígitos verificadores estão corretos
    if (parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2) {
        return true
    }
    return '{_field_} não é válido'
  } else return true
})

setInteractionMode('passive')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)