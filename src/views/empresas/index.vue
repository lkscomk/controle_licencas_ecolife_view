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
                @adicionar="modal = true, controle.inserir = true, formulario.status = enumStatusEmpresas.digitacao"
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
                        sm="4"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.id"
                          v-mask="'###########'"
                          hide-details
                          dense
                          label="Código"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="1"
                        lg="1"
                        md="4"
                        sm="4"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.cnpj"
                          v-mask="'##.###.###/####-##'"
                          hide-details
                          dense
                          label="CNPJ"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="2"
                        lg="2"
                        md="4"
                        sm="4"
                        cols="12"
                      >
                        <selecao-all
                          v-model="filtro.status"
                          :items="dropdownStatusEmpresa"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Status"
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
                        <v-text-field
                          v-model="filtro.nomeFantasia"
                          v-uppercase
                          hide-details
                          dense
                          label="Nome Fantasia"
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
                        <v-text-field
                          v-model="filtro.razaoSocial"
                          v-uppercase
                          hide-details
                          dense
                          label="Razão Social"
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
                          v-model="filtro.porte"
                          :items="dropdownPortesEmpresa"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Porte"
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
                          v-model="filtro.cidade"
                          :items="dropdownCidades"
                          hide-details
                          dense
                          item-value="codigo"
                          item-text="nome"
                          label="Cidade"
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
                sm="2"
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
                :xl="formulario.id ? 2 : 3"
                :lg="formulario.id ? 2 : 3"
                :md="formulario.id ? 2 : 3"
                :sm="formulario.id ? 4 : 6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CNPJ"
                  vid="cnpj"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.cnpj"
                    v-mask="'##.###.###/####-##'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="CNPJ*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="6"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.status"
                  disabled
                  :items="dropdownStatusEmpresa"
                  hide-details
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Status Empresa"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="7"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome Fantasia"
                  vid="nomeFantasia"
                  rules="required|max:100"
                >
                  <v-text-field
                    v-model="formulario.nomeFantasia"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.nomeFantasia && formulario.nomeFantasia.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Nome Fantasia*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Razão Social"
                  vid="razaoSocial"
                  rules="required|max:100"
                >
                  <v-text-field
                    v-model="formulario.razaoSocial"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.razaoSocial && formulario.razaoSocial.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Razão Social*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="4"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Data de Cadastro"
                  vid="dataCadastro"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.dataCadastro"
                    v-mask="'##/##/####'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Data de Cadastro*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="3"
                sm="4"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Incrição Estadual"
                  vid="inscricaoEstadual"
                  rules=""
                >
                  <v-text-field
                    v-model="formulario.inscricaoEstadual"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Incrição Estadual"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="3"
                sm="4"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Incrição Municipal"
                  vid="inscricaoMunicipal"
                  rules=""
                >
                  <v-text-field
                    v-model="formulario.inscricaoMunicipal"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Incrição Municipal"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="6"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Porte"
                  rules="required"
                  vid="porte"
                >
                  <v-autocomplete
                    v-model="formulario.porte"
                    :items="dropdownPortesEmpresa"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    item-value="item"
                    item-text="descricao"
                    label="Porte*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
              >
                Endereço Principal
              </v-col>
              <v-col
                xl="1"
                lg="2"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CEP"
                  vid="cep"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.cep"
                    v-mask="'#####-###'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="CEP*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Logradouro"
                  vid="logradouro"
                  rules="required|max:100"
                >
                  <v-text-field
                    v-model="formulario.logradouro"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.logradouro && formulario.logradouro.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Logradouro*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="1"
                lg="2"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Número"
                  vid="enderecoNumero"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.enderecoNumero"
                    v-mask="'##########'"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    label="Número*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Estado"
                  rules="required"
                  vid="estado"
                >
                  <v-autocomplete
                    v-model="formulario.estado"
                    :items="dropdownEstados"
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    item-value="uf"
                    item-text="nome"
                    label="Estado*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Cidade"
                  rules="required"
                  vid="cidade"
                >
                  <v-autocomplete
                    v-model="formulario.cidade"
                    :items="dropdownCidades"
                    :disabled="controle.exibir || !formulario.estado || !(formulario.estado === 'RO' || formulario.estado === 'AM' || formulario.estado === 'AC')"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    dense
                    item-value="codigo"
                    item-text="nome"
                    label="Cidade*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="4"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Bairro"
                  vid="bairro"
                  rules="required|max:100"
                >
                  <v-text-field
                    v-model="formulario.bairro"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.bairro && formulario.bairro.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Bairro*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="6"
                lg="4"
                md="12"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Complemento"
                  vid="complemento"
                  rules="max:100"
                >
                  <v-text-field
                    v-model="formulario.complemento"
                    v-uppercase
                    :disabled="controle.exibir"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.complemento && formulario.complemento.length > 0) && !controle.exibir)"
                    :counter="100"
                    dense
                    label="Complemento"
                    outlined
                  />
                </validation-provider>
              </v-col>

              <v-col
                v-if="formulario.id"
                xl="2"
                lg="2"
                md="3"
                sm="6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.created_by"
                  disabled
                  hide-details
                  dense
                  label="Criado Por*"
                  outlined
                />
              </v-col>
              <v-col
                v-if="formulario.id"
                xl="2"
                lg="2"
                md="3"
                sm="6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.created_at"
                  disabled
                  hide-details
                  dense
                  label="Criado Em*"
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
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaEmpresas',
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
        text: 'CNPJ',
        align: 'start',
        sortable: false,
        value: 'cnpj'
      },
      {
        text: 'Status',
        align: 'start',
        sortable: false,
        value: 'status'
      },
      {
        text: 'Nome Fantasia',
        align: 'start',
        sortable: false,
        value: 'nome_fantasia'
      },
      {
        text: 'Razão Social',
        align: 'start',
        sortable: false,
        value: 'razao_social'
      },
      {
        text: 'Data Cadastro',
        align: 'start',
        sortable: false,
        value: 'data_cadastro'
      },
      {
        text: 'Cidade',
        align: 'start',
        sortable: false,
        value: 'cidade'
      },
      {
        text: 'Porte',
        align: 'start',
        sortable: false,
        value: 'porte_descricao'
      }
    ],
    enumStatusEmpresas: {
      digitacao: 1
    },
    filtro: {
      id: null,
      cnpj: null,
      status: [],
      cidade: [],
      nomeFantasia: null,
      razaoSocial: null,
      porte: []
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      cnpj: null,
      status: null,
      nomeFantasia: null,
      razaoSocial: null,
      dataCadastro: null,
      inscricaoEstadual: null,
      inscricaoMunicipal: null,
      porte: null,
      cep: null,
      logradouro: null,
      enderecoNumero: null,
      estado: null,
      cidade: null,
      complemento: null,
      bairro: null,
      created_at: null,
      created_by: null
    },
    modal: false
  }),
  computed: {
    ...mapState('empresa', [
      'registros',
      'dropdownStatusEmpresa',
      'dropdownPortesEmpresa',
      'dropdownEstados',
      'dropdownCidades'
    ]),
    filtroValor () {
      return !!(
        this.filtro.id ||
        this.filtro.cnpj ||
        (this.filtro.cidade
          ? this.filtro.cidade.length
          : null) ||
        (this.filtro.status
          ? this.filtro.status.length
          : null) ||
        this.filtro.nomeFantasia ||
        this.filtro.razaoSocial ||
        (this.filtro.porte
          ? this.filtro.porte.length
          : null)
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
  watch: {
    async 'formulario.estado' (value) {
      if (value && (this.formulario.estado === 'RO' || this.formulario.estado === 'AM' || this.formulario.estado === 'AC')) await this.buscarDropdownCidade(value)
    }
  },
  async created () {
    this.listarRegistro()
    await this.buscarDropdownPortesEmpresa()
    await this.buscarDropdownStatusEmpresa()
    await this.buscarDropdownEstados()
    this.buscarDropdownCidade('RO')
  },
  methods: {
    ...mapActions('empresa', [
      'listar',
      'exibir',
      'editar',
      'salvar',
      'excluir',
      'buscarDropdownPortesEmpresa',
      'buscarDropdownStatusEmpresa',
      'buscarDropdownEstados',
      'buscarDropdownCidade'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        id: this.filtro.id || null,
        cnpj: this.filtro.cnpj ? String(this.filtro.cnpj).match(/\d/g).join('') : undefined,
        cidade: this.filtro.cidade && this.filtro.cidade.length ? this.filtro.cidade : null,
        status: this.filtro.status && this.filtro.status.length ? this.filtro.status : null,
        nomeFantasia: this.filtro.nomeFantasia || null,
        razaoSocial: this.filtro.razaoSocial || null,
        porteEmpresa: this.filtro.porte && this.filtro.porte.length ? this.filtro.porte : null
      })
      this.loading = false
    },
    async exibirRegistro (id) {
      this.loading = true
      const res = await this.exibir(id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          cnpj: res.cnpj || null,
          status: res.status_empresa_id || null,
          nomeFantasia: res.nome_fantasia || null,
          razaoSocial: res.razao_social || null,
          dataCadastro: res.data_cadastro ? this.$day(res.data_cadastro).format('DD/MM/YYYY') : null,
          inscricaoEstadual: res.inscricao_estadual || null,
          inscricaoMunicipal: res.inscricao_municipal || null,
          porte: res.porte_empresa_id || null,
          cep: res.cep || null,
          logradouro: res.logradouro || null,
          enderecoNumero: res.numero || null,
          complemento: res.complemento || null,
          bairro: res.bairro || null,
          estado: res.estado || null,
          cidade: res.cidade ? Number(res.cidade) : null,
          created_by: res.created_by || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null
        }
      }
      this.modal = true
      this.controle.exibir = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        const dataCadastro = this.$dataValidade(this.formulario.dataCadastro)
        if (dataCadastro) {
          if (dataCadastro) this.$refs.observer.setErrors({ dataCadastro: [dataCadastro] })
          return
        }
        this.loading = true

        const form = {
          id: this.formulario.id || undefined,
          cnpj: this.formulario.cnpj ? String(this.formulario.cnpj).match(/\d/g).join('') : undefined,
          nomeFantasia: this.formulario.nomeFantasia || undefined,
          razaoSocial: this.formulario.razaoSocial || undefined,
          inscricaoEstadual: this.formulario.inscricaoEstadual || undefined,
          inscricaoMunicipal: this.formulario.inscricaoMunicipal || undefined,
          porte: this.formulario.porte || undefined,
          dataCadastro: this.formulario.dataCadastro ? this.$day(this.formulario.dataCadastro, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
          cep: this.formulario.cep ? String(this.formulario.cep).match(/\d/g).join('') : undefined,
          logradouro: this.formulario.logradouro || undefined,
          estado: this.formulario.estado || undefined,
          cidade: this.formulario.cidade || undefined,
          enderecoNumero: this.formulario.enderecoNumero || undefined,
          complemento: this.formulario.complemento || undefined,
          bairro: this.formulario.bairro || undefined
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)
        if (res && !res.erro) {
          this.modal = false
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
        cnpj: null,
        status: null,
        nomeFantasia: null,
        razaoSocial: null,
        dataCadastro: null,
        inscricaoEstadual: null,
        inscricaoMunicipal: null,
        porte: null,
        cep: null,
        logradouro: null,
        enderecoNumero: null,
        estado: null,
        cidade: null,
        complemento: null,
        bairro: null,
        created_at: null,
        created_by: null
      }
      this.controle = {
        exibir: false,
        editar: false,
        inserir: false
      }
      this.buscarDropdownCidade('RO')
      this.listarRegistro()
    },
    limparFiltros () {
      this.filtro = {
        id: null,
        cnpj: null,
        cidade: [],
        status: [],
        nomeFantasia: null,
        razaoSocial: null,
        porte: []
      }
    }
  }
}
</script>
