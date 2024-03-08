import '@/plugins/axios_local'
import '@/plugins/notificacao'
import '@/plugins/crypto'
import Vue from 'vue'
import SortableTable from './plugins/sortable'
import App from './App.vue'
import '@/plugins/dayjs'
import '@/plugins/validacoes'
import router from './router'
import store from './store'
import '@/plugins/validate'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import VueMask from 'v-mask'
import Vupper from '@/plugins/uppercase'

Vue.config.productionTip = false

Vue.component('selecao-all', () => import('./components/selecao-all'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('aviso', () => import('./components/aviso'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('loading', () => import('./components/loading'))

Vue.use(VueMask)
Vue.use(Vupper)

Vue.directive('sortable-table', SortableTable)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
