<template>
  <v-app>
    <loading :value="loading" />
    <aviso
      v-model="aviso.modal"
      :options="aviso"
      @registrarCienciaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, registrarCienciaRegistro()"
    />
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
        @click="modalNotificacoes = !modalNotificacoes, listarRegistroNotificacoes()"
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

    <v-main>
      <router-view />
    </v-main>

    <modal
      v-model="modalNotificacoes"
      width="100%"
      :titulo="'Notificações'"
      :mais-opcoes="false"
      @fechar="limparFiltroNotificacoes(), modalNotificacoes = false"
    >
      <template>
        <v-form @submit.prevent="''">
          <v-container
            class="ma-0 pa-0"
            fluid
          >
            <v-row dense>
              <v-col cols="12">
                <filtro
                  :options="optionsFilterModalNotificacoes"
                  @clearFilters="limparFiltroNotificacoes()"
                  @pesquisar="listarRegistroNotificacoes()"
                >
                  <template slot="filtros">
                    <v-container
                      class="my-0 py-0"
                      fluid
                    >
                      <v-row dense>
                        <v-col
                          xl="1"
                          lg="1"
                          md="3"
                          sm="2"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroNotificacoes.id"
                            v-mask="'###########'"
                            hide-details
                            dense
                            label="Código"
                            outlined
                            @keydown.enter="!loading ? listarRegistroNotificacoes() : null"
                          />
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="5"
                          sm="5"
                          cols="12"
                        >
                          <v-autocomplete
                            v-model="filtroNotificacoes.caracteristica_notificacao"
                            :items="dropdownCaracteristicaNotificacao"
                            hide-details
                            dense
                            item-value="item"
                            item-text="descricao"
                            label="Vencendo em/Vencida"
                            clearable
                            outlined
                          />
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="4"
                          sm="5"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroNotificacoes.descricao"
                            v-uppercase
                            hide-details
                            dense
                            label="Título"
                            outlined
                            @keydown.enter="!loading ? listarRegistroNotificacoes() : null"
                          />
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="8"
                          sm="8"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroNotificacoes.conteudo"
                            v-uppercase
                            hide-details
                            dense
                            label="Descrição"
                            outlined
                            @keydown.enter="!loading ? listarRegistroNotificacoes() : null"
                          />
                        </v-col>
                        <v-col
                          xl="2"
                          lg="2"
                          md="4"
                          sm="4"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroNotificacoes.cnpj"
                            v-mask="['###.###.###-##', '##.###.###/####-##']"
                            hide-details
                            dense
                            label="CNPJ/CPF"
                            outlined
                            @keydown.enter="!loading ? listarRegistro() : null"
                          />
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="8"
                          sm="8"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroNotificacoes.razaoSocial"
                            v-uppercase
                            hide-details
                            dense
                            label="Razão Social"
                            outlined
                            @keydown.enter="!loading ? listarRegistro() : null"
                          />
                        </v-col>
                        <v-col
                          xl="2"
                          lg="2"
                          md="4"
                          sm="4"
                          cols="12"
                        >
                          <v-autocomplete
                            v-model="filtroNotificacoes.ciente"
                            :items="dropdownSimNao"
                            hide-details
                            dense
                            item-value="id"
                            item-text="descricao"
                            label="Ciente"
                            outlined
                            clearable
                            @keydown.enter="!loading ? listarRegistroNotificacoes() : null"
                          />
                        </v-col>
                        <v-col
                          xl="2"
                          lg="2"
                          md="4"
                          sm="12"
                          cols="12"
                        >
                          <selecao-all
                            v-model="filtroNotificacoes.prioridade"
                            :items="dropdownPrioridadeEmpresa"
                            hide-details
                            dense
                            item-value="item"
                            item-text="descricao"
                            label="Prioridade"
                            outlined
                            @keydown.enter="!loading ? listarRegistro() : null"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </filtro>
              </v-col>
              <v-col cols="12">
                <tabela
                  :colunas="colunasNotificacoes"
                  :registros="registrosNotificacoes"
                  :paginacao="paginacaoNotificacoes"
                  :registros-por-pagina="100"
                  :sort-by-cli="['id']"
                  :sort-desc-cli="true"
                  height-auto
                  class="mt-2"
                  toolbar-grid
                  titulo="Listagem de Notificações"
                  @paginacao="paginacaoNotificacoes = $event"
                >
                  <template v-slot:botoes>
                    <v-btn
                      color="primary"
                      small
                      @click="gerarRelatorioRegistros"
                    >
                      <v-icon>
                        mdi-printer
                      </v-icon>
                      IMPRIMIR
                    </v-btn>
                  </template>
                  <template v-slot:acao="{ registro }">
                    <v-btn
                      :color="registro.cor"
                      :disabled="!!registro.ciente_em"
                      class="mx-1"
                      icon
                      small
                      @click="aviso = { modal: true, text: 'Ao dá ciencia nesta notificação, a mesma permanecerá aqui por três dias. Depois não será mais notificado. Deseja continuar? \n \n <br>IMPORTANTE: Essa notificação só irá parar de ser notificada se o problema for resolvido!</br>', key: 'registrarCienciaRegistro'}
                              notificacaoRegistro = registro"
                    >
                      <v-icon :color="registro.cor">
                        {{ !registro.ciente_em ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked' }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:personalizado="{ registro }">
                    <v-btn
                      :color="registro.cor"
                      class="mx-1"
                      icon
                      small
                      @click="openUrlNew(registro.url)"
                    >
                      <v-icon :color="registro.cor">
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </template>
                </tabela>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </modal>

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

export default {
  name: 'App',

  data: () => ({
    modalNotificacoes: false,
    notificacaoRegistro: null,
    loading: false,
    dataAtual: '',
    drawer: false,
    group: null,
    nome: window.atob(localStorage.getItem('umbrella:nome')),
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    email: window.atob(localStorage.getItem('umbrella:email')),
    imagemPerfil: null,
    enumImportancia: {
      alta: 1,
      media: 2,
      baixa: 3
    },
    dropdownSimNao: [
      {
        id: 1,
        descricao: 'Sim'
      },
      {
        id: 2,
        descricao: 'Não'
      }
    ],
    aviso: {
      modal: false,
      conteudo: '',
      acao: ''
    },
    filtroNotificacoes: {
      id: null,
      cnpj: null,
      razaoSocial: null,
      descricao: null,
      conteudo: null,
      ciente: null,
      caracteristica_notificacao: null,
      prioridade: null
    },
    colunasNotificacoes: [
      {
        text: 'Dar Ciente',
        align: 'start',
        sortable: false,
        value: 'acao',
        width: 20
      },
      {
        text: 'Abrir Janela',
        align: 'start',
        sortable: false,
        value: 'personalizado',
        width: 20
      },
      {
        text: 'Código',
        align: 'start',
        sortable: true,
        value: 'id'
      },
      {
        text: 'Título',
        align: 'start',
        sortable: true,
        value: 'descricao'
      },
      {
        text: 'Descrição',
        align: 'start',
        sortable: true,
        value: 'conteudo'
      },
      {
        text: 'CNPJ/CPF',
        align: 'start',
        sortable: true,
        value: 'cnpj'
      },
      {
        text: 'Razão Social',
        align: 'start',
        sortable: true,
        value: 'razao_social'
      },
      {
        text: 'Prioridade',
        align: 'start',
        sortable: true,
        value: 'prioridade_descricao'
      },
      {
        text: 'Ciente Por',
        align: 'start',
        sortable: true,
        value: 'ciente_por'
      },
      {
        text: 'Ciente Em',
        align: 'start',
        sortable: true,
        value: 'ciente_em'
      },
      {
        text: 'Criado Por',
        align: 'start',
        sortable: true,
        value: 'created_by'
      },
      {
        text: 'Criado Em',
        align: 'start',
        sortable: true,
        value: 'created_at'
      }
    ],
    paginacaoNotificacoes: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    }
  }),

  computed: {
    ...mapState('empresa', [
      'dropdownPrioridadeEmpresa'
    ]),
    ...mapState('app', [
      'registrosNotificacoes',
      'dropdownCaracteristicaNotificacao'
    ]),
    acessos_usuario () {
      return JSON.parse(window.atob(localStorage.getItem('umbrella:acessos_usuario')))
    },
    optionsFilterModalNotificacoes () {
      return {
        adicionar: false,
        values: !!(
          this.filtroNotificacoes.id ||
          this.filtroNotificacoes.descricao ||
          this.filtroNotificacoes.conteudo ||
          this.filtroNotificacoes.caracteristica_notificacao ||
          this.filtroNotificacoes.cnpj ||
          this.filtroNotificacoes.razaoSocial ||
          this.filtroNotificacoes.ciente ||
          this.filtroNotificacoes.prioridade
        )
      }
    }
  },

  watch: {
    group () {
      this.drawer = false
    }
  },

  async created () {
    this.buscarImagem()
    await this.buscarDropdownCaracteristicaNotificacao()
    await this.buscarDropdownPrioridadeEmpresa()
    setTimeout(() => {
      this.atualizarData()
    }, 200)
    setTimeout(async () => {
      this.listarRegistroNotificacoes()
    }, 200)
  },

  methods: {
    ...mapActions('app', [
      'logout',
      'buscarPathImagem',
      'buscarNotificacoes',
      'registrarCiencia',
      'gerarRelatorio',
      'buscarDropdownCaracteristicaNotificacao',
      'exibirAnexo'
    ]),
    ...mapActions('empresa', [
      'buscarDropdownPrioridadeEmpresa'
    ]),
    async gerarRelatorioRegistros () {
      this.loading = true
      const colunas = [
        {
          text: 'Cód.',
          value: 'id'
        },
        {
          text: 'Título',
          value: 'descricao'
        },
        {
          text: 'Descrição',
          value: 'conteudo'
        },
        {
          text: 'CNPJ/CPF',
          value: 'cnpj'
        },
        {
          text: 'Razão Social',
          value: 'razao_social'
        },
        {
          text: 'Prioridade',
          value: 'prioridade_descricao'
        },
        {
          text: 'Ciente Por',
          value: 'ciente_por'
        },
        {
          text: 'Ciente Em',
          value: 'ciente_em'
        }
      ]
      const dados = this.registrosNotificacoes && this.registrosNotificacoes.length ? this.registrosNotificacoes.sort((a, b) => {
        const razaoA = a.razao_social ? a.razao_social.toLowerCase() : ''
        const razaoB = b.razao_social ? b.razao_social.toLowerCase() : ''
        return razaoA.localeCompare(razaoB)
      }) : null
      const res = await this.gerarRelatorio({
        colunas: colunas.map(coluna => coluna.text),
        colunas_para_mesclar: ['CNPJ/CPF', 'Razão Social'],
        titulo: 'Relatório de Notificações',
        dados: dados && dados.length ? dados.map(item => colunas.map(coluna => coluna.value === 'razao_social' && (item[coluna.value] || '').length > 35 ? item[coluna.value].slice(0, 35) + '[...]' : item[coluna.value] || '')) : null
      })

      const buffer = Buffer.from(res, 'binary')
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      // Abre o PDF em uma nova aba
      window.open(url, '_blank')
      this.loading = false
    },
    async buscarImagem () {
      this.loading = true
      const dados = await this.buscarPathImagem(this.perfil)
      if (dados) {
        const nome = `${dados.nome}${dados.extensao}`
        const res = await this.exibirAnexo(nome)

        if (res && !res.erro) {
          const type = dados.extensao === '.pdf' ? 'application/pdf'
            : dados.extensao === '.jpeg' ? 'image/jpeg'
              : dados.extensao === '.jpg' ? 'image/jpg'
                : dados.extensao === '.png' ? 'image/png'
                  : dados.extensao === '.bmp' ? 'image/bmp'
                    : dados.extensao === '.gif' ? 'image/gif' : null

          if (type) {
            const buffer = Buffer.from(res)
            const blob = new Blob([buffer], { type })
            this.imagemPerfil = URL.createObjectURL(blob)
          }
        }
      }

      this.loading = false
    },
    async listarRegistroNotificacoes () {
      this.loading = true
      await this.buscarNotificacoes({
        usuarioId: this.perfil,
        id: this.filtroNotificacoes.id || null,
        descricao: this.filtroNotificacoes.descricao || null,
        conteudo: this.filtroNotificacoes.conteudo || null,
        cnpj: this.filtroNotificacoes.cnpj ? String(this.filtroNotificacoes.cnpj).match(/\d/g).join('') : undefined,
        razaoSocial: this.filtroNotificacoes.razaoSocial || null,
        ciente: this.filtroNotificacoes.ciente || null,
        caracteristica_notificacao: this.filtroNotificacoes.caracteristica_notificacao || null,
        prioridade: this.filtroNotificacoes.prioridade && this.filtroNotificacoes.prioridade.length ? this.filtroNotificacoes.prioridade : null
      })
      this.loading = false
    },
    async registrarCienciaRegistro () {
      this.loading = true
      const res = await this.registrarCiencia(this.notificacaoRegistro)

      if (res && !res.erro) {
        this.listarRegistroNotificacoes()
        this.notificacaoRegistro = null
        this.modalNotificacoes = true
      }
      this.loading = false
    },
    openUrlNew (valor) {
      window.open(valor, '_blank')
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
    },
    limparFiltroNotificacoes () {
      this.filtroNotificacoes = {
        id: null,
        cnpj: null,
        razaoSocial: null,
        descricao: null,
        conteudo: null,
        ciente: null,
        caracteristica_notificacao: null,
        prioridade: null
      }
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
