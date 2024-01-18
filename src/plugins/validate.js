/* eslint-disable  */

import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import{ email, length, max, max_value, min, min_value, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'

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


setInteractionMode('passive')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)