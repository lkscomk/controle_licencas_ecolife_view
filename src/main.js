import '@/plugins/axios_local'
import '@/plugins/notificacao'
import Vue from 'vue'
import App from './App.vue'
import '@/plugins/dayjs'
import '@/plugins/validacoes'
import router from './router'
import store from './store'
import '@/plugins/validate'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VueMask from 'v-mask'

Vue.config.productionTip = false

Vue.component('date-selector', () => import('./components/dataSelecionar'))
Vue.component('selecao-all', () => import('./components/selecao-all'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('loading', () => import('./components/loading'))

Vue.use(VueMask)

Vue.directive('uppercase', {
  bind (el, binding, vnode) {
    el.addEventListener('input', function (event) {
      event.target.value = event.target.value.toUpperCase()
      vnode.context.$data[vnode.data.model.expression] = event.target.value
    })
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
