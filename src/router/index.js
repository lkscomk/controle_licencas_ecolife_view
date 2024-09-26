import Vue from 'vue'
import store from '@/store/'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

function temAcesso (urlNecessaria) {
  const acessosUsuario = JSON.parse(window.atob(localStorage.getItem('umbrella:acessos_usuario'))) || []
  return acessosUsuario.some(acesso => acesso.url === urlNecessaria)
}

const routes = [
  {
    path: '/',
    component: () => import('@/layout/layoutInterno.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('@/views/informacoes_perfil/index.vue'),
        beforeEnter: (to, from, next) => {
            next()
          } else {
            next('/proibido')
          }
        }
      },
      {
        path: '/opcoes',
        name: 'Opções Globais',
        component: () => import('@/views/opcoes/index.vue'),
        beforeEnter: (to, from, next) => {
          if (temAcesso('/opcoes')) {
            next()
          } else {
            next('/proibido')
          }
        }
      },
      {
        path: '/usuarios',
        name: 'Usuários',
        component: () => import('../views/usuarios/index.vue'),
        beforeEnter: (to, from, next) => {
          if (temAcesso('/usuarios')) {
            next()
          } else {
            next('/proibido')
          }
        }
      },
      {
        path: '/processo',
        name: 'Processo',
        component: () => import('../views/processo/index.vue'),
        beforeEnter: (to, from, next) => {
          if (temAcesso('/processo')) {
            next()
          } else {
            next('/proibido')
          }
        }
      },
      {
        path: '/empresas',
        name: 'Empresas',
        component: () => import('../views/empresas/index.vue'),
        beforeEnter: (to, from, next) => {
          if (temAcesso('/empresas')) {
            next()
          } else {
            next('/proibido')
          }
        }
      },
      {
        path: '/acessos',
        name: 'Acessos',
        component: () => import('../views/acessos/index.vue'),
        beforeEnter: (to, from, next) => {
          if (temAcesso('/acessos')) {
            next()
          } else {
            next('/proibido')
          }
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        window.console.log(store.state.app)
        next()
      } else {
        Vue.prototype.$notificacao('Usuário não autenticado', 'atencao')
        next('/login')
      }
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next('/')
      } else {
        localStorage.removeItem('umbrella:token')
        localStorage.removeItem('umbrella:nome')
        localStorage.removeItem('umbrella:login')
        localStorage.removeItem('umbrella:email')
        localStorage.removeItem('umbrella:perfil')
        localStorage.removeItem('umbrella:acessos_usuario')
        next()
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
