<template>
  <v-app>
    <loading :value="loading" />
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />
      <div
        class="headline font-weight-regular d-flex align-center"
        @click="abrirJenela('/')"
      >
        Ecolife
      </div>
      <v-spacer />

      <!-- v-if="registrosNotificacoes && registrosNotificacoes.length" -->
      <v-app-bar-nav-icon
        class="mx-1"
        title="Notificações do Sistema"
        @click="modalNotificacoes = !modalNotificacoes"
      >
        <v-avatar
          icon
          size="50"
        >
          <v-icon
            :color="registrosNotificacoes && registrosNotificacoes.find(el => el.importancia === enumImportancia.alta) ? 'red darken-2' : 'warning'"
            class="bell elevation-2"
            size="35"
          >
            mdi-bell
          </v-icon>
        </v-avatar>
      </v-app-bar-nav-icon>

      <div class="d-flex d-inline-flex pl-2">
        <v-menu
          bottom
          left
          width="400"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-avatar
              color="primary elevation-4"
              class="white--text font-weight-black headline"
              size="45"
              v-on="on"
            >
              <v-img
                v-if="imagemPerfil"
                :src="imagemPerfil"
                alt="Profile Image"
              />
              <div v-else>
                {{ nome.substring(0,2) }}
              </div>
            </v-avatar>
          </template>

          <v-card width="220">
            <v-card-title class="subtitle mb-3">
              {{ `${nome.split(' ')[0]}` }}
            </v-card-title>

            <v-card-subtitle>
              {{ email }}
            </v-card-subtitle>

            <v-divider class="mb-1" />

            <v-card-actions>
              <v-btn
                :color="$vuetify.theme.dark
                  ? ''
                  : 'primary'"
                block
                @click="deslogar()"
              >
                <v-icon
                  left
                  size="28"
                >
                  mdi-logout-variant
                </v-icon>SAIR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="drawer"
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(tela, index) in acessos_usuario"
            :key="index"
            @click="abrirJenela(tela.url)"
          >
            <v-list-item-icon class="mr-3">
              <v-icon color="primary">
                {{ tela.icone }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ tela.nome }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="deslogar()">
            <v-list-item-icon class="mr-3">
              <v-icon color="error">
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Sair
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="modalNotificacoes"
      :color="$vuetify.theme.dark
        ? ''
        : 'white'"
      app
      disable-resize-watcher
      hide-overlay
      right
      temporary
      width="420"
    >
      <v-row class="pt-2 pb-2">
        <v-col
          cols="12"
          xl="8"
          lg="8"
          md="8"
          xs="12"
          class="d-flex justify-center align-center"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Notificações do Sistema
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-divider />
      Etapa Ainda em Desenvolvimento
      <v-list
        class="mt-2"
        nav
      >
        <v-row
          class="pa-0"
          dense
        >
          <v-col
            v-for="notificacao in registrosNotificacoes"
            :key="notificacao.id"
            cols="12"
            class="text-start"
          >
            <v-alert
              :color="notificacao.cor"
              :icon="notificacao.icone && notificacao.icone.toLowerCase()"
              border="left"
              colored-border
              elevation="2"
              prominent
              style="cursor: pointer;"
              class="pl-1 ml-0 cardNotificacao"
              :style="{
                borderLeft: '8px solid '+ (!notificacao.importancia ? '' : +notificacao.importancia === 1 ? '#2979FF' : +notificacao.importancia === 2 ? '#F2C037' : '#eb2f06') +' !important',
              }"
              @click="openUrlNew(notificacao.detail)"
            >
              <h3 class="text-h6">
                {{ notificacao.titulo }}
              </h3>
              <span>
                <b>{{ notificacao.quantidade }}</b> {{ notificacao.conteudo }}
              </span>
            </v-alert>
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
      :color="$vuetify.theme.dark
        ? ''
        : 'primary'"
      app
      class="pa-0"
      dark
      height="20"
    >
      <v-col
        class="text-center ma-0 pa-0 caption"
        cols="12"
      >
        <span class="caption font-weight-bold mr-10">
          {{ dataAtual }}
        </span>
        <strong v-if="!$vuetify.breakpoint.mobile">
          developed by Umbrella
        </strong>
        <span v-if="!$vuetify.breakpoint.mobile">
          - Versão
        </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/plugins/axios_local'

export default {
  name: 'App',

  data: () => ({
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    modalNotificacoes: false,
    loading: true,
    dataAtual: '',
    drawer: false,
    group: null,
    nome: window.atob(localStorage.getItem('umbrella:nome')),
    email: window.atob(localStorage.getItem('umbrella:email')),
    imagemPerfil: null,
    enumImportancia: {
      alta: 1,
      media: 2,
      baixa: 3
    }
  }),

  computed: {
    ...mapState('app', [
      'acessos_usuario',
      'registrosNotificacoes'
    ])
  },
  watch: {
    group () {
      this.drawer = false
    }
  },

  created () {
    setTimeout(() => {
      this.atualizarData()
    }, 200)
    setTimeout(async () => {
      await this.buscarAcessos(this.perfil)
      // this.buscarNotificacoesRegistros()
    }, 200)
  },

  methods: {
    ...mapActions('app', [
      'logout',
      'buscarAcessos',
      'buscarPathImagem',
      'buscarNotificacoes'
    ]),
    async buscarImagem () {
      const res = await this.buscarPathImagem(this.perfil)
      let foto = null
      if (res && !res.erro && res.checksum) {
        await axios
          .get(`https://servidor-arquivos-umbrella.lukasrocha.repl.co/download${res.checksum}`, {
            responseType: 'arraybuffer'
          })
          .then(function (response) {
            foto = response.data
          })
          .catch(function (error) {
            window.console.log(error)
          })
        const buffer = Buffer.from(foto, 'binary')
        const blob = new Blob([buffer], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        this.imagemPerfil = imageUrl
      }
    },
    async buscarNotificacoesRegistros () {
      const res = await this.buscarNotificacoes({
        usuarioId: this.perfil
      })
      if (res && !res.erro) {
        window.console.log(res)
      }
    },
    openUrlNew (valor) {
      // const param = this.$route.fullPath
      // window.console.log(this.$route)
      this.$router.replace({
        name: 'TelaLicencas',
        query: {
          id: window.btoa(JSON.stringify(valor))
        }
      })
    },
    atualizarData () {
      this.dataAtual = this.$day().format('dddd - DD - MMMM - YYYY HH:mm:ss')

      setTimeout(() => {
        this.atualizarData()
      }, 1000)
    },
    abrirJenela (tela) {
      if (tela !== this.$router.currentRoute.path) {
        const route = this.$router.resolve({ path: tela })

        if (tela) {
          this.$router.push(route.href)
        }
      } else {
        window.location.reload(true)
      }
    },
    deslogar () {
      this.loading = true
      this.logout()
      this.$router.push('/login')
      this.$notificacao('Usuário desconectado com sucesso!')
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.bell{
  -webkit-animation: ring 4s .7s ease-in-out infinite;
  -webkit-transform-origin: 50% 4px;
  -moz-animation: ring 4s .7s ease-in-out infinite;
  -moz-transform-origin: 50% 4px;
  animation: ring 4s .7s ease-in-out infinite;
  transform-origin: 50% 4px;
}

@-webkit-keyframes ring {
  0% { -webkit-transform: rotateZ(0); }
  1% { -webkit-transform: rotateZ(30deg); }
  3% { -webkit-transform: rotateZ(-28deg); }
  5% { -webkit-transform: rotateZ(34deg); }
  7% { -webkit-transform: rotateZ(-32deg); }
  9% { -webkit-transform: rotateZ(30deg); }
  11% { -webkit-transform: rotateZ(-28deg); }
  13% { -webkit-transform: rotateZ(26deg); }
  15% { -webkit-transform: rotateZ(-24deg); }
  17% { -webkit-transform: rotateZ(22deg); }
  19% { -webkit-transform: rotateZ(-20deg); }
  21% { -webkit-transform: rotateZ(18deg); }
  23% { -webkit-transform: rotateZ(-16deg); }
  25% { -webkit-transform: rotateZ(14deg); }
  27% { -webkit-transform: rotateZ(-12deg); }
  29% { -webkit-transform: rotateZ(10deg); }
  31% { -webkit-transform: rotateZ(-8deg); }
  33% { -webkit-transform: rotateZ(6deg); }
  35% { -webkit-transform: rotateZ(-4deg); }
  37% { -webkit-transform: rotateZ(2deg); }
  39% { -webkit-transform: rotateZ(-1deg); }
  41% { -webkit-transform: rotateZ(1deg); }

  43% { -webkit-transform: rotateZ(0); }
  100% { -webkit-transform: rotateZ(0); }
}

@-moz-keyframes ring {
  0% { -moz-transform: rotate(0); }
  1% { -moz-transform: rotate(30deg); }
  3% { -moz-transform: rotate(-28deg); }
  5% { -moz-transform: rotate(34deg); }
  7% { -moz-transform: rotate(-32deg); }
  9% { -moz-transform: rotate(30deg); }
  11% { -moz-transform: rotate(-28deg); }
  13% { -moz-transform: rotate(26deg); }
  15% { -moz-transform: rotate(-24deg); }
  17% { -moz-transform: rotate(22deg); }
  19% { -moz-transform: rotate(-20deg); }
  21% { -moz-transform: rotate(18deg); }
  23% { -moz-transform: rotate(-16deg); }
  25% { -moz-transform: rotate(14deg); }
  27% { -moz-transform: rotate(-12deg); }
  29% { -moz-transform: rotate(10deg); }
  31% { -moz-transform: rotate(-8deg); }
  33% { -moz-transform: rotate(6deg); }
  35% { -moz-transform: rotate(-4deg); }
  37% { -moz-transform: rotate(2deg); }
  39% { -moz-transform: rotate(-1deg); }
  41% { -moz-transform: rotate(1deg); }

  43% { -moz-transform: rotate(0); }
  100% { -moz-transform: rotate(0); }
}

@keyframes ring {
  0% { transform: rotate(0); }
  1% { transform: rotate(30deg); }
  3% { transform: rotate(-28deg); }
  5% { transform: rotate(34deg); }
  7% { transform: rotate(-32deg); }
  9% { transform: rotate(30deg); }
  11% { transform: rotate(-28deg); }
  13% { transform: rotate(26deg); }
  15% { transform: rotate(-24deg); }
  17% { transform: rotate(22deg); }
  19% { transform: rotate(-20deg); }
  21% { transform: rotate(18deg); }
  23% { transform: rotate(-16deg); }
  25% { transform: rotate(14deg); }
  27% { transform: rotate(-12deg); }
  29% { transform: rotate(10deg); }
  31% { transform: rotate(-8deg); }
  33% { transform: rotate(6deg); }
  35% { transform: rotate(-4deg); }
  37% { transform: rotate(2deg); }
  39% { transform: rotate(-1deg); }
  41% { transform: rotate(1deg); }

  43% { transform: rotate(0); }
  100% { transform: rotate(0); }
}
</style>
