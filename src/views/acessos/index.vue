<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Acessos"
    titulo="Acessos"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @voltar="modal = false, resetFormulario()"
    @excluir="excluirRegistro()"
  >
    <template slot="listagem">
      <v-form @submit.prevent="''">
        <v-container
          class="my-0 py-0"
          fluid
        >
          <v-row dense>
            <v-col cols="12">
              <filtro
                :options="optionsFilter"
                @pesquisar="listarRegistro()"
                @clearFilters="limparFiltros()"
                @adicionar="modal = true, controle.inserir = true"
              >
                <template slot="filtros">
                  <v-container
                    class="my-0 py-0"
                    fluid
                  >
                    <v-row dense>
                      <v-col
                        xl="2"
                        lg="2"
                        md="4"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.id"
                          v-mask="'#########'"
                          hide-details
                          dense
                          label="Id"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="4"
                        lg="4"
                        md="4"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.nome"
                          hide-details
                          dense
                          label="Nome"
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </filtro>
            </v-col>
            <v-col cols="12">
              <tabela
                :colunas="colunas"
                :registros="registros"
                :paginacao="paginacao"
                :registros-por-pagina="100"
                :sort-by-cli="['id']"
                :sort-desc-cli="true"
                height-auto
                exibir
                class="mt-2"
                toolbar-grid
                titulo="Listagem de Telas"
                @paginacao="paginacao = $event"
                @exibir="exibirRegistro($event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <template slot="formulario">
      <v-form @submit.prevent="''">
        <validation-observer ref="observer">
          <v-container
            class="my-2 py-0"
            fluid
          >
            <v-row dense>
              <v-col
                v-if="formulario.id"
                cols="1"
              >
                <v-text-field
                  v-model="formulario.id"
                  hide-details
                  disabled
                  dense
                  label="Id"
                  outlined
                />
              </v-col>
              <v-col cols="3">
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome"
                  vid="nome"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.nome"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Nome*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col cols="3">
                <validation-provider
                  v-slot="{ errors }"
                  name="Url"
                  vid="url"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.url"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Url*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col cols="3">
                <validation-provider
                  v-slot="{ errors }"
                  name="Icone"
                  vid="icone"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.icone"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :append-icon="formulario.icone"
                    dense
                    label="Icone*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                v-if="formulario.id"
                cols="2"
              >
                <v-text-field
                  v-model="formulario.created_by"
                  disabled
                  hide-details
                  dense
                  label="Criado Por"
                  outlined
                />
              </v-col>
              <v-col
                v-if="formulario.id"
                cols="3"
              >
                <v-text-field
                  v-model="formulario.created_at"
                  disabled
                  hide-details
                  dense
                  label="Criado Em"
                  outlined
                />
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-form>
    </template>
    <template slot="botoes">
      <v-btn
        v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
        :block="$vuetify.breakpoint.xsOnly"
        :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
        color="success"
        small
        @click="salvarRegistro()"
      >
        <v-icon
          left
          size="20"
        >
          mdi-content-save
        </v-icon>
        Salvar
      </v-btn>
      <v-btn
        v-if="!!(controle.exibir && !controle.inserir)"
        :block="$vuetify.breakpoint.xsOnly"
        :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
        color="success"
        small
        @click="controle.editar = true, controle.exibir = false"
      >
        <v-icon
          left
          size="20"
        >
          mdi-pencil
        </v-icon>
        Editar
      </v-btn>
      <v-btn
        :block="$vuetify.breakpoint.xsOnly"
        :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
        color="error"
        small
        @click="modal = false, resetFormulario()"
      >
        <v-icon
          left
          size="20"
        >
          mdi-cancel
        </v-icon>
        Voltar
      </v-btn>
    </template>
    <template
      v-if="formulario.id"
      slot="relacionamento"
    >
      <v-card
        class="ma-2 elevation-0"
        outlined
      >
        <v-container
          class="my-2 py-0"
          fluid
        >
          <v-row dense>
            <v-col
              class="body-2 font-weight-bold"
              cols="12"
            >
              Quem pode ter acesso a essa tela?
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                v-model="formularioRelacionamento.tipoUsuario"
                :items="dropdownGrupos"
                hide-details
                dense
                item-value="item"
                item-text="descricao"
                label="Tipo Usuário"
                outlined
              />
            </v-col>
            <v-col cols="3">
              <v-btn
                v-if="controle.exibir || controle.editar"
                color="primary"
                @click="salvarRegistroTipos()"
              >
                Adicionar
              </v-btn>
            </v-col>
            <v-col
              cols="12"
            >
              <tabela
                :colunas="colunasTipo"
                :registros="registrosTipo"
                :paginacao="paginacaoTipos"
                :registros-por-pagina="100"
                :sort-by-cli="['id']"
                :sort-desc-cli="true"
                height-auto
                excluir
                class="mt-2"
                toolbar-grid
                titulo="Listagem de Tipos"
                @paginacao="paginacaoTipos = $event"
                @excluir="excluirRegistroTipos($event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaAcessos',
  data: () => ({
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    colunas: [
      {
        text: 'Ação',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Icone',
        align: 'start',
        sortable: false,
        value: 'icone'
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Url',
        align: 'start',
        sortable: false,
        value: 'url'
      },
      {
        text: 'Criado Por',
        align: 'start',
        sortable: false,
        value: 'created_by'
      },
      {
        text: 'Criado Em',
        align: 'start',
        sortable: false,
        value: 'created_at'
      }
    ],
    colunasTipo: [
      {
        text: 'Ação',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Tipo Usuário',
        align: 'start',
        sortable: false,
        value: 'item'
      },
      {
        text: 'Tipo Descrição',
        align: 'start',
        sortable: false,
        value: 'descricao'
      },
      {
        text: 'Criado Por',
        align: 'start',
        sortable: false,
        value: 'created_by'
      },
      {
        text: 'Criado Em',
        align: 'start',
        sortable: false,
        value: 'created_at'
      }
    ],
    filtro: {
      id: null,
      nome: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      nome: null,
      url: null,
      created_at: null,
      created_by: null
    },
    formularioRelacionamento: {
      tipoUsuario: null
    },
    modal: false,
    modalAdicionar: false,
    paginacao: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    paginacaoTipos: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    }
  }),
  computed: {
    ...mapState('acessos', [
      'registros',
      'registrosTipo',
      'dropdownGrupos'
    ]),
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(this.filtro.id || this.filtro.nome)
      }
    },
    maisOpcoes () {
      return [
        {
          acao: 'excluir',
          color: 'error',
          icone: 'mdi-delete',
          titulo: 'Excluir'
        }
      ]
    }
  },
  created () {
    this.listarRegistro()
  },
  methods: {
    ...mapActions('app', [
      'buscarAcessos'
    ]),
    ...mapActions('acessos', [
      'listar',
      'exibir',
      'editar',
      'salvar',
      'excluir',
      'listarTiposAcesso',
      'salvarTiposAcesso',
      'excluirTiposAcesso',
      'buscarDropdownGrupos'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        id: this.filtro.id || null,
        nome: this.filtro.nome || null
      })
      this.loading = false
    },
    async exibirRegistro (id) {
      this.loading = true
      const res = await this.exibir(id)

      if (res && !res.erro) {
        this.formulario = {
          id: res.id,
          nome: res.nome,
          icone: res.icone,
          url: res.url,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by
        }
        this.listarRegistroTipos()
        await this.buscarDropdownGrupos(2) // tipos de usuarios
      }
      this.modal = true
      this.controle.exibir = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || null,
          icone: this.formulario.icone || null,
          nome: this.formulario.nome || null,
          url: this.formulario.url || null
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)

        if (res && !res.erro) {
          this.controle = {
            exibir: true,
            editar: false,
            inserir: false
          }
          this.exibirRegistro(res.id)
          await this.buscarAcessos(this.perfil)
        }
        this.loading = false
      }
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.modal = false
        this.resetFormulario()
        this.listarRegistro()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    // tipos
    async listarRegistroTipos () {
      this.loading = true
      await this.listarTiposAcesso({
        tela: this.formulario.id
      })
      this.loading = false
    },
    async salvarRegistroTipos () {
      this.loading = true
      const form = {
        tela: this.formulario.id || null,
        tipo: this.formularioRelacionamento.tipoUsuario || null
      }

      const res = await this.salvarTiposAcesso(form)

      if (res && !res.erro) {
        this.formularioRelacionamento.tipoUsuario = null
        this.listarRegistroTipos()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    async excluirRegistroTipos (registro) {
      this.loading = true
      const res = await this.excluirTiposAcesso(registro.id)
      if (res && !res.erro) {
        this.listarRegistroTipos()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    resetFormulario () {
      this.formulario = {
        id: null,
        nome: null,
        icone: null,
        url: null,
        created_at: null,
        created_by: null
      }
      this.formularioRelacionamento = {
        tipoUsuario: null
      }
      this.controle = {
        exibir: false,
        editar: false,
        inserir: false
      }
      this.listarRegistro()
    },
    limparFiltros () {
      this.filtro = {
        id: null,
        nome: null
      }
    }
  }
}
</script>
