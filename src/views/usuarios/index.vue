<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Usuários"
    titulo="Usuários"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @voltar="resetFormulario()"
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
                          v-mask="'#####'"
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
                          v-uppercase
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
                          v-mask="'###.###.###-##'"
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
      <v-form @submit.prevent="''">
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
                md="2"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.id"
                  hide-details
                  disabled
                  dense
                  label="Código"
                  outlined
                />
              </v-col>
              <v-col
                :xl="formulario.id ? 3 : 4"
                :lg="formulario.id ? 3 : 4"
                :md="formulario.id ? 3 : 5"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome"
                  rules="required|max:100"
                  vid="nome"
                >
                  <v-text-field
                    v-model="formulario.nome"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.nome && formulario.nome.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Nome*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|max:100"
                  vid="email"
                >
                  <v-text-field
                    v-model="formulario.email"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.email && formulario.email.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Email*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="3"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Data de Nascimento"
                  rules="required"
                  vid="dataNascimento"
                >
                  <v-text-field
                    v-model="formulario.dataNascimento"
                    v-mask="'##/##/####'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Data Nascimento*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="1"
                lg="3"
                md="3"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CPF"
                  rules="required"
                  vid="cpf"
                >
                  <v-text-field
                    v-model="formulario.cpf"
                    v-mask="'###.###.###-##'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="CPF*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="3"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Tipo de Usuário"
                  rules=""
                  vid="tipoUsuarioId"
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
                    label="Tipo de Usuário*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                v-if="formulario.id"
                xl="2"
                lg="2"
                md="3"
                sm="12"
                cols="12"
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
        color="error"
        small
        @click="resetFormulario()"
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
        cpf: this.filtro.cpf ? String(this.filtro.cpf).match(/\d/g).join('') : undefined
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
      this.controle.exibir = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        const dataNascimento = this.$dataValidade(this.formulario.dataNascimento)
        const cpf = this.$cpfValidate(this.formulario.cpf)
        const email = this.$emailValidade(this.formulario.email)
        if (dataNascimento || email || cpf) {
          if (dataNascimento) this.$refs.observer.setErrors({ dataNascimento: [dataNascimento] })
          if (email) this.$refs.observer.setErrors({ email: [email] })
          if (cpf) this.$refs.observer.setErrors({ cpf: [cpf] })
          return
        }
        this.loading = true

        const form = {
          id: this.formulario.id || undefined,
          nome: this.formulario.nome || undefined,
          tipoUsuarioId: this.formulario.tipoUsuarioId || undefined,
          email: this.formulario.email || undefined,
          senha: this.$crypto(12345678, 'sha256'),
          dataNascimento: this.formulario.dataNascimento ? this.$day(this.formulario.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          cpf: this.formulario.cpf ? String(this.formulario.cpf).match(/\d/g).join('') : undefined
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)
        if (res && !res.erro) {
          this.modal = false
          this.exibirRegistro(res.id)
        }
      }
      this.loading = false
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.resetFormulario()
      }
      this.loading = false
    },
    resetFormulario () {
      this.$refs.observer.reset()
      this.formulario = {
        id: null,
        nome: null,
        login: null,
        tipoUsuarioId: null,
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
      this.modal = false
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
