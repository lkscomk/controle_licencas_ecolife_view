<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Empresas"
    titulo="Empresas"
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
                @adicionar="modal = true, controle.inserir = true"
                @clearFilters="limparFiltros()"
                @pesquisar="listarRegistro()"
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
                        md="4"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.id"
                          hide-details
                          dense
                          label="Código"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="3"
                        lg="3"
                        md="8"
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
                      <v-col
                        xl="2"
                        lg="2"
                        md="4"
                        sm="12"
                        cols="12"
                      >
                        <selecao-all
                          v-model="filtro.tipo"
                          :items="dropdownTiposUsuarios"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Tipo"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="3"
                        lg="3"
                        md="8"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.email"
                          hide-details
                          dense
                          label="Email"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="3"
                        lg="3"
                        md="8"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.cpf"
                          hide-details
                          dense
                          label="CPF"
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
      <v-form
        ref="form"
        @submit.prevent="''"
      >
        <validation-observer ref="observer">
          <v-container
            fluid
            grid-list-xs
          >
            <v-row dense>
              <v-col
                v-if="formulario.id"
                xl="1"
                lg="1"
                md="1"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Id"
                  vid="id"
                >
                  <v-text-field
                    v-model="formulario.id"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    disabled
                    dense
                    label="Código"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                :xl="formulario.id ? 5 : 6"
                :lg="formulario.id ? 5 : 6"
                :md="formulario.id ? 5 : 6"
                sm="12"
                cols="12"
              >
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
                    label="Nome"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="6"
                lg="6"
                md="6"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="formulario.email"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Email"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Data de Nascimento"
                  vid="dataNascimento"
                  rules="required|data"
                >
                  <!-- <date-selector
                    v-model="formulario.dataNascimento"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Data de Nascimento"
                    outlined
                    readonly
                    clearable
                  /> -->
                  <v-text-field
                    v-model="formulario.dataNascimento"
                    v-mask="'##/##/####'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Data Nascimento"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CPF"
                  vid="cpf"
                  rules="required|numeric|cpf"
                >
                  <v-text-field
                    v-model="formulario.cpf"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="CPF"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Tipo de Usuário"
                  vid="empresaOrigem"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="formulario.tipoUsuarioId"
                    :disabled="controle.exibir"
                    :items="dropdownTiposUsuarios"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    item-value="item"
                    item-text="descricao"
                    label="Tipo de Usuário"
                    class="required"
                    outlined
                  />
                </validation-provider>
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
        Voltar
      </v-btn>
    </template>
  </pagina>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaUsuarios',
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
        text: 'Código',
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
        text: 'Tipo',
        align: 'start',
        sortable: false,
        value: 'tipo'
      },
      {
        text: 'Email',
        align: 'start',
        sortable: false,
        value: 'email'
      },
      {
        text: 'CPF',
        align: 'start',
        sortable: false,
        value: 'cpf'
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
      tipo: [],
      nome: null,
      email: null,
      cpf: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      nome: null,
      login: null,
      tipoUsuarioId: null,
      dataNascimento: null,
      email: null,
      cpf: null,
      created_at: null
    },
    modal: false
  }),
  computed: {
    ...mapState('usuarios', [
      'registros',
      'registrosRelacionamento',
      'dropdownTiposUsuarios'
    ]),
    formularioNome: {
      get () {
        return this.formulario.nome ? this.formulario.nome.toUpperCase() : this.formulario.nome
      },
      set (valor) {
        this.formulario.nome = valor.toUpperCase()
      }
    },
    filtroValor () {
      return !!(
        (this.filtro.tipo
          ? this.filtro.tipo.length
          : null) ||
        this.filtro.nome ||
        this.filtro.email ||
        this.filtro.id ||
        this.filtro.cpf
      )
    },
    optionsFilter () {
      return {
        adicionar: true,
        values: this.filtroValor
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
  async created () {
    this.listarRegistro()
    await this.buscarDropdownTiposUsuarios(2) // TIPOS USUARIOS
  },
  methods: {
    ...mapMutations('usuarios', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('usuarios', [
      'listar',
      'exibir',
      'editar',
      'salvar',
      'excluir',
      'buscarDropdownTiposUsuarios'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        id: this.filtro.id || null,
        tipo: this.filtro.tipo && this.filtro.tipo.length ? this.filtro.tipo : null,
        nome: this.filtro.nome || null,
        email: this.filtro.email || null,
        cpf: this.filtro.cpf || null
      })
      this.loading = false
    },
    async exibirRegistro (usuario) {
      this.loading = true
      const res = await this.exibir(usuario)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          nome: res.nome || null,
          login: `${res.id}-${res.nome.split(' ')[0]}`,
          tipoUsuarioId: res.tipo_usuario_id || null,
          dataNascimento: res.data_nascimento ? this.$day(res.data_nascimento).format('DD/MM/YYYY') : null,
          email: res.email || null,
          cpf: res.cpf || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null
        }
      }
      this.modal = true
      this.loading = false
      this.controle.exibir = true
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        const form = {
          id: this.formulario.id || undefined,
          nome: this.formulario.nome || undefined,
          tipoUsuarioId: this.formulario.tipoUsuarioId || undefined,
          email: this.formulario.email || undefined,
          dataNascimento: this.formulario.dataNascimento ? this.$day(this.formulario.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          cpf: this.formulario.cpf || undefined
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
      }
      this.loading = false
    },
    resetFormulario () {
      this.$refs.observer.reset()
      this.formulario = {
        id: null,
        nome: null,
        login: null,
        tipo: null,
        dataNascimento: null,
        email: null,
        cpf: null,
        created_at: null
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
        tipo: [],
        nome: null,
        email: null,
        cpf: null
      }
    }
  }
}
</script>
