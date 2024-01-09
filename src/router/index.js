import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next('/home')
      } else {
        localStorage.removeItem('umbrella:token')
        localStorage.removeItem('umbrella:nome')
        localStorage.removeItem('umbrella:login')
        localStorage.removeItem('umbrella:email')
        localStorage.removeItem('umbrella:perfil')
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('@/layout/layoutInterno.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('@/views/informacoes_perfil/index.vue')
      },
      {
        path: '/opcoes',
        name: 'Opções Globais',
        component: () => import('@/views/opcoes/index.vue')
      },
      {
        path: '/usuarios',
        name: 'Usuários',
        component: () => import('../views/usuarios/index.vue')
      },
      {
        path: '/licencas',
        name: 'Licenças',
        component: () => import('../views/licencas/index.vue')
      },
      {
        path: '/empresas',
        name: 'Empresas',
        component: () => import('../views/empresas/index.vue')
      },
      {
        path: '/acessos',
        name: 'Acessos',
        component: () => import('../views/acessos/index.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next()
      } else {
        Vue.prototype.$notificacao('Usuário não autenticado', 'atencao')
        next('/login')
      }
    }
  },
  {
    path: '*',
    component: () => import('@/views/error/404')
  },
  {
    path: '/proibido',
    name: 'Proibido',
    component: () => import('@/views/error/403'),
    beforeEnter: (to, from, next) => localStorage.getItem('umbrella:token') ? next() : next('/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
