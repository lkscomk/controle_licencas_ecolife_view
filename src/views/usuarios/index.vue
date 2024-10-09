<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Usuários"
    titulo="Usuários"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @voltar="resetFormulario()"
    @excluir="formulario.status_usuario_id === enumStatusUsuario.digitacao ? aviso = { modal: true, text: 'Deseja excluir esse registro?', key: 'excluirRegistro'} : $notificacao('É possível excluir apenas registros em digitação', 'erro')"
    @resetSenha="aviso = { modal: true, text: 'Deseja resetar a senha desse usuário?', key: 'resetSenhaRegistro'}"
    @ativar="aviso = { modal: true, text: 'Deseja ativar este usuário?', key: 'ativarUsuarioRegistro'}"
    @desativar="aviso = { modal: true, text: 'Deseja desativar este usuário?', key: 'desativarUsuarioRegistro'}"
  >
    <aviso
      v-model="aviso.modal"
      :options="aviso"
      @cancelar="aviso = {
        modal: false,
        text: '',
        key: ''
      }"
      @excluirRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, excluirRegistro()"
      @resetSenhaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, resetSenhaRegistro()"
      @ativarUsuarioRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, ativarUsuarioRegistro()"
      @desativarUsuarioRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, desativarUsuarioRegistro()"
    />
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
                @adicionar="modal = true, controle.inserir = true, formulario.status_usuario_id = enumStatusUsuario.digitacao"
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
                          v-mask="['###.###.###-##', '##.###.###/####-##']"
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
                :paginacao="paginacao"
                :registros-por-pagina="100"
                :sort-by-cli="['id']"
                :sort-desc-cli="true"
                height-auto
                exibir
                class="mt-2"
                toolbar-grid
                titulo="Listagem de Usuários"
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
                xl="2"
                lg="2"
                md="3"
                sm="4"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.status_usuario_id"
                  :items="dropdownStatusUsuario"
                  disabled
                  hide-details
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Status Usuário"
                  outlined
                />
              </v-col>
              <v-col
                :xl="formulario.id ? 4 : 3"
                :lg="formulario.id ? 4 : 3"
                :md="formulario.id ? 4 : 4"
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
                    :disabled="controle.exibir || controle.editar"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.nome && formulario.nome.length > 0) && !(controle.exibir || controle.editar))"
                    :counter="100"
                    dense
                    label="Nome"
                    class="required"
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
                    :disabled="controle.exibir || controle.editar"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.email && formulario.email.length > 0) && !(controle.exibir || controle.editar))"
                    :counter="100"
                    dense
                    label="Email"
                    class="required"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Data de Nascimento"
                  rules="required"
                  vid="data_nascimento"
                >
                  <v-text-field
                    v-model="formulario.data_nascimento"
                    v-mask="'##/##/####'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Data Nascimento"
                    class="required"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
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
                    label="CPF"
                    class="required"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Tipo de Usuário"
                  rules="required"
                  vid="tipo_usuario_id"
                >
                  <v-autocomplete
                    v-model="formulario.tipo_usuario_id"
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
              <v-col
                v-if="formulario.id"
                xl="2"
                lg="2"
                md="3"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.ultimo_login"
                  disabled
                  hide-details
                  dense
                  label="Último Login Em"
                  outlined
                />
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
              <v-col
                v-if="formulario.id"
                xl="2"
                lg="2"
                md="3"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.updated_by"
                  disabled
                  hide-details
                  dense
                  label="Última Alteração Por"
                  outlined
                />
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
                  v-model="formulario.updated_at"
                  disabled
                  hide-details
                  dense
                  label="Última Alteração Em"
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
    aviso: {
      modal: false,
      conteudo: '',
      acao: ''
    },
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
        text: 'Status',
        align: 'start',
        sortable: false,
        value: 'status'
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
        text: 'Último Login Em',
        align: 'start',
        sortable: false,
        value: 'ultimo_login'
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
      tipo_usuario_id: null,
      data_nascimento: null,
      status_usuario_id: null,
      email: null,
      cpf: null,
      ultimo_login: null,
      created_at: null,
      created_by: null,
      updated_at: null,
      updated_by: null
    },
    enumStatusUsuario: {
      digitacao: 1,
      ativo: 2,
      desativado: 3
    },
    paginacao: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    modal: false
  }),
  computed: {
    ...mapState('usuarios', [
      'registros',
      'registrosRelacionamento',
      'dropdownTiposUsuarios',
      'dropdownStatusUsuario'
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
      const opcoes = [
        {
          acao: 'excluir',
          color: 'error',
          icone: 'mdi-delete',
          titulo: 'Excluir'
        },
        {
          acao: 'resetSenha',
          color: 'error',
          icone: 'mdi-refresh',
          titulo: 'Resetar Senha'
        }
      ]

      if (this.formulario.status_usuario_id === this.enumStatusUsuario.digitacao) {
        opcoes.push({
          acao: 'ativar',
          color: 'success',
          icone: 'mdi-account-arrow-right',
          titulo: 'Ativar Usuário'
        })
      }

      if (this.formulario.status_usuario_id === this.enumStatusUsuario.ativo) {
        opcoes.push({
          acao: 'desativar',
          color: 'error',
          icone: 'mdi-account-remove',
          titulo: 'Desativar Usuário'
        })
      }

      return opcoes
    }
  },
  async created () {
    this.listarRegistro()
    await this.buscarDropdownTiposUsuarios()
    await this.buscarDropdownStatusUsuarios()
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
      'resetSenha',
      'buscarDropdownTiposUsuarios',
      'buscarDropdownStatusUsuarios',
      'ativarUsuario',
      'desativarUsuario'
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
          tipo_usuario_id: res.tipo_usuario_id || null,
          status_usuario_id: res.status_usuario_id || null,
          data_nascimento: res.data_nascimento ? this.$day(res.data_nascimento).format('DD/MM/YYYY') : null,
          email: res.email || null,
          cpf: res.cpf || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by || null,
          updated_at: res.updated_at ? this.$day(res.updated_at).format('DD/MM/YYYY HH:mm:ss') : null,
          updated_by: res.updated_by || null,
          ultimo_login: res.ultimo_login ? this.$day(res.ultimo_login).format('DD/MM/YYYY HH:mm:ss') : null
        }
      }
      this.modal = true
      this.controle.exibir = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        const dataNascimento = this.$dataValidade(this.formulario.data_nascimento)
        const cpf = this.$cpfValidate(this.formulario.cpf)
        const email = this.$emailValidade(this.formulario.email)
        if (dataNascimento || email || cpf) {
          if (dataNascimento) this.$refs.observer.setErrors({ data_nascimento: ['data_nascimento'] })
          if (email) this.$refs.observer.setErrors({ email: [email] })
          if (cpf) this.$refs.observer.setErrors({ cpf: [cpf] })
          return
        }
        this.loading = true

        const form = {
          id: this.formulario.id || undefined,
          nome: this.formulario.nome || undefined,
          tipo_usuario_id: this.formulario.tipo_usuario_id || undefined,
          email: this.formulario.email || undefined,
          data_nascimento: this.formulario.data_nascimento ? this.$day(this.formulario.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
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
    async resetSenhaRegistro () {
      this.loading = true
      this.resetSenha(this.formulario.id)
      this.loading = false
    },
    async ativarUsuarioRegistro () {
      this.loading = true
      const res = await this.ativarUsuario(this.formulario)
      if (res && !res.erro) {
        this.exibirRegistro(this.formulario.id)
      }
      this.loading = false
    },
    async desativarUsuarioRegistro () {
      this.loading = true
      const res = await this.desativarUsuario(this.formulario)
      if (res && !res.erro) {
        this.exibirRegistro(this.formulario.id)
      }
      this.loading = false
    },
    resetFormulario () {
      this.$refs.observer.reset()
      this.formulario = {
        id: null,
        nome: null,
        login: null,
        tipo_usuario_id: null,
        data_nascimento: null,
        status_usuario_id: null,
        email: null,
        cpf: null,
        ultimo_login: null,
        created_at: null,
        created_by: null,
        updated_at: null,
        updated_by: null
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
