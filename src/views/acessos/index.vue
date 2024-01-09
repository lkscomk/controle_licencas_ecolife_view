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
                @adicionar="modal = true, controle.inserir = true"
              >
                <template slot="filtros">
                  <v-container
                    class="my-0 py-0"
                    fluid
                  >
                    <v-row dense>
                      <v-col cols="3">
                        <v-text-field
                          v-model="filtro.codigo"
                          hide-details
                          dense
                          label="Id"
                          outlined
                        />
                      </v-col>
                      <v-col cols="3">
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
                exibir
                @exibir="exibirRegistro($event.id)"
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
              <v-col cols="1">
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
                <v-text-field
                  v-model="formulario.nome"
                  :disabled="controle.exibir"
                  hide-details
                  dense
                  label="Nome"
                  outlined
                />
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="formulario.url"
                  :disabled="controle.exibir"
                  hide-details
                  dense
                  label="Url"
                  outlined
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="formulario.created_by"
                  disabled
                  hide-details
                  dense
                  label="Criado Por"
                  outlined
                />
              </v-col>
              <v-col cols="3">
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
        color="success"
        small
        @click="salvarRegistro()"
      >
        Salvar
      </v-btn>
      <v-btn
        v-if="!!(controle.exibir && !controle.inserir)"
        color="success"
        small
        @click="controle.editar = true, controle.exibir = false"
      >
        Editar
      </v-btn>
      <v-btn
        color="error"
        small
        @click="modal = false, resetFormulario()"
      >
        Fechar
      </v-btn>
    </template>
    <template
      v-if="formulario.id"
      slot="relacionamento"
    >
      <v-container
        v-if="formulario.id"
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
              excluir
              @excluir="excluirRegistroTipos($event.id)"
            />
          </v-col>
        </v-row>
      </v-container>
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
    modalAdicionar: false
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
        values: !!(this.filtro.descricao)
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
        codigo: this.filtro.codigo || null,
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
          url: res.url,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by
        }
        this.listarRegistroTipos()
        await this.buscarDropdownGrupos(2) // tipos de usuarios
      }
      this.controle.exibir = true
      this.modal = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || null,
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
    async excluirRegistroTipos (id) {
      this.loading = true
      const res = await this.excluirTiposAcesso(id)
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
    }
  }
}
</script>
