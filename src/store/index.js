import Vue from 'vue'
import Vuex from 'vuex'
import app from './app/'
import perfil from '../views/informacoes_perfil/store'
import opcoes from '../views/opcoes/store'
import usuarios from '../views/usuarios/store'
import acessos from '../views/acessos/store'
import empresa from '../views/empresas/store'
import processo from '../views/processo/store'
import home from '../views/home/store'

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
    opcoes,
    usuarios,
    acessos,
    empresa,
    processo,
    home
  }
})
