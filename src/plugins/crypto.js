import Vue from 'vue'
import crypto from 'crypto'

const criptografar = (senha, tipo) => {
  return crypto.createHash(tipo).update(senha).digest('hex')
}

Vue.prototype.$crypto = criptografar

export default criptografar
