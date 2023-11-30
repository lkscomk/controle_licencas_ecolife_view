import Vue from 'vue'
import Vuex from 'vuex'
import app from './app/'
import perfil from '../views/informacoes_perfil/store'
import licencas from '../views/licencas/store'
import opcoes from '../views/opcoes/store'
import usuarios from '../views/usuarios/store'
import acessos from '../views/acessos/store'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    app,
    perfil,
    licencas,
    opcoes,
    usuarios,
    acessos
  }
})
