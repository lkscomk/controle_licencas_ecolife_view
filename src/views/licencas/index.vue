<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Licenças"
    titulo="Licenças"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @voltar="resetFormulario()"
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
                @clearFilters="limparFiltros()"
                @adicionar="controle.inserir = true, modal = true"
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
                        md="2"
                        sm="4"
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
                        xl="2"
                        lg="2"
                        md="3"
                        sm="8"
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
                        md="3"
                        sm="4"
                        cols="12"
                      >
                        <selecao-all
                          v-model="filtro.status"
                          :items="dropdownStatusLicencas"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Status"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="3"
                        lg="3"
                        md="4"
                        sm="8"
                        cols="12"
                      >
                        <selecao-all
                          v-model="filtro.tipo"
                          :items="dropdownTiposLicencas"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Tipo Licença"
                          outlined
                        />
                      </v-col>

                      <v-col
                        xl="2"
                        lg="2"
                        md="4"
                        sm="6"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.processo"
                          v-mask="'##.#####.##/####'"
                          hide-details
                          dense
                          label="Processo"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="2"
                        lg="2"
                        md="3"
                        sm="6"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.dataVencimento"
                          v-mask="'##/##/####'"
                          hide-details
                          dense
                          label="Data de Vencimento"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="12"
                        lg="12"
                        md="5"
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
                cols="12"
              >
                Empresa
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="2"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Empresa"
                  vid="Empresa"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.empresaId"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    append-icon="mdi-magnify"
                    dense
                    label="Código Empresa"
                    outlined
                    @click:append="modalBuscarEmpresa = true"
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl=" 3"
                lg=" 3"
                md=" 3"
                sm=" 6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.cnpj"
                  v-mask="'##.###.###/####-##'"
                  disabled
                  hide-details
                  dense
                  label="CNPJ"
                  outlined
                />
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
                <v-text-field
                  v-model="formulario.nomeFantasia"
                  v-uppercase
                  disabled
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
                sm="6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.razaoSocial"
                  v-uppercase
                  disabled
                  hide-details
                  dense
                  label="Razão Social"
                  outlined
                />
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="4"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.dataCadastro"
                  v-mask="'##/##/####'"
                  disabled
                  hide-details
                  dense
                  label="Data de Cadastro"
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
                <v-text-field
                  v-model="formulario.inscricaoEstadual"
                  hide-details
                  disabled
                  dense
                  label="Incrição Estadual"
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
                <v-text-field
                  v-model="formulario.inscricaoMunicipal"
                  hide-details
                  disabled
                  dense
                  label="Incrição Municipal"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="6"
                sm="12"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.porte"
                  :items="dropdownPortesEmpresa"
                  hide-details
                  disabled
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Porte"
                  outlined
                />
              </v-col>
              <v-col
                v-if="formulario.id"
                xl="1"
                lg="1"
                md="1"
                sm="3"
                cols="12"
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
              <v-col
                :xl="formulario.id ? 4 : 5"
                :lg="formulario.id ? 4 : 5"
                :md="formulario.id ? 4 : 5"
                :sm="formulario.id ? 6 : 5"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.grupo"
                  :items="[]"
                  disabled
                  hide-details
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Grupo*"
                  outlined
                />
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="2"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.item"
                  hide-details
                  disabled
                  dense
                  label="Item*"
                  outlined
                />
              </v-col>
              <v-col
                xl="5"
                lg="5"
                md="5"
                sm="5"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Descrição"
                  vid="descricao"
                  rules="required"
                >
                  <v-text-field
                    v-model="formularioDescricao"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="Descrição*"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                v-if="formulario.id"
                xl="3"
                lg="3"
                md="3"
                sm="3"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.created_by"
                  hide-details
                  disabled
                  dense
                  label="Criado Por"
                  outlined
                />
              </v-col>
              <v-col
                v-if="formulario.id"
                xl="4"
                lg="4"
                md="4"
                sm="4"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.created_at"
                  hide-details
                  disabled
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
        smallsd
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
    <modal
      v-model="modalBuscarEmpresa"
      width="1200"
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
                            v-model="filtroModalEmpresa.id"
                            v-mask="'###########'"
                            hide-details
                            dense
                            label="Código"
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
                          <v-text-field
                            v-model="filtroModalEmpresa.cnpj"
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
                            v-model="filtroModalEmpresa.status"
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
                            v-model="filtroModalEmpresa.nomeFantasia"
                            v-uppercase
                            hide-details
                            dense
                            label="Nome Fantasia"
                            outlined
                          />
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="4"
                          sm="12"
                          cols="12"
                        >
                          <v-text-field
                            v-model="filtroModalEmpresa.razaoSocial"
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
                            v-model="filtroModalEmpresa.porte"
                            :items="dropdownPortesEmpresa"
                            hide-details
                            dense
                            item-value="item"
                            item-text="descricao"
                            label="Porte"
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
                  :colunas="colunasEmpresa"
                  :registros="registrosEmpresas"
                  exibir
                  @exibir="exibirRegistro($event.id)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </modal>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TelaLicencas',
  data: () => ({
    loading: false,
    modalBuscarEmpresa: false,
    colunasEmpresa: [
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
        text: 'Porte',
        align: 'start',
        sortable: false,
        value: 'porte_descricao'
      }
    ],
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
        text: 'CNPJ Empresa',
        align: 'start',
        sortable: false,
        value: 'cnpj'
      },
      {
        text: 'Razão Social',
        align: 'start',
        sortable: false,
        value: 'razao_social'
      },
      {
        text: 'N. Processo',
        align: 'start',
        sortable: false,
        value: 'processo'
      },
      {
        text: 'Vencimento',
        align: 'start',
        sortable: false,
        value: 'data_vencimento'
      },
      {
        text: 'Tipo Lincença',
        align: 'start',
        sortable: false,
        value: 'tipo'
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
    filtroModalEmpresa: {
      id: null,
      cnpj: null,
      status: [],
      nomeFantasia: null,
      razaoSocial: null,
      porte: []
    },
    filtro: {
      id: null,
      cnpj: null,
      status: null,
      tipo: null,
      razaoSocial: null,
      processo: null,
      dataVencimento: null
    },
    filtroRelacionamento: {
      descricao: null,
      grupo: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      empresaId: null,
      cnpj: null,
      status: null,
      nomeFantasia: null,
      razaoSocial: null,
      dataCadastro: null,
      inscricaoEstadual: null,
      inscricaoMunicipal: null,
      porte: null,
      id: null,
      created_at: null,
      created_by: null,
      grupo: null,
      item: null,
      descricao: null
    },
    modal: false
  }),
  computed: {
    ...mapState('licencas', [
      'registros',
      'dropdownStatusLicencas',
      'dropdownTiposLicencas',
      'registrosEmpresas',
      'dropdownStatusEmpresa',
      'dropdownPortesEmpresa',
      'dropdownEstados',
      'dropdownCidades'
    ]),
    formularioDescricao: {
      get () {
        return this.formulario.descricao ? this.formulario.descricao.toUpperCase() : this.formulario.descricao
      },
      set (valor) {
        this.formulario.descricao = valor.toUpperCase()
      }
    },
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(
          this.filtro.id ||
          this.filtro.cnpj ||
          (this.filtro.status ? this.filtro.status.length : null) ||
          (this.filtro.tipo ? this.filtro.tipo.length : null) ||
          this.filtro.razaoSocial ||
          this.filtro.processo ||
          this.filtro.dataVencimento
        )
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
    await this.buscarDropdownTiposLicencas()
    await this.buscarDropdownStatusLicencas()
    await this.buscarDropdownPortesEmpresa()
    await this.buscarDropdownStatusEmpresa()
    await this.buscarDropdownEstados()
    this.listarRegistro()
    this.listarRegistroEmpresas()
  },
  methods: {
    ...mapActions('licencas', [
      'listar',
      'exibir',
      'salvar',
      'editar',
      'excluir',
      'buscarDropdownStatusLicencas',
      'buscarDropdownTiposLicencas',

      'listarEmpresas',
      'buscarDropdownPortesEmpresa',
      'buscarDropdownStatusEmpresa',
      'buscarDropdownEstados',
      'buscarDropdownCidade'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        id: this.filtro.id || null,
        cnpj: this.filtro.cnpj ? String(this.filtro.cnpj).match(/\d/g).join('') : null,
        status: this.filtro.status || null,
        tipo: this.filtro.tipo || null,
        razaoSocial: this.filtro.razaoSocial || null,
        processo: this.filtro.processo ? String(this.filtro.processo).match(/\d/g).join('') : null,
        dataVencimento: this.filtro.dataVencimento ? this.$day(this.filtro.dataVencimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
      })
      this.loading = false
    },
    async listarRegistroEmpresas () {
      this.loading = true
      await this.listarEmpresas({
        id: this.filtro.id || null,
        cnpj: this.filtro.cnpj ? String(this.filtro.cnpj).match(/\d/g).join('') : undefined,
        status: this.filtro.status && this.filtro.status.length ? this.filtro.status : null,
        nomeFantasia: this.filtro.nomeFantasia || null,
        razaoSocial: this.filtro.razaoSocial || null,
        porteEmpresa: this.filtro.porte && this.filtro.porte.length ? this.filtro.porte : null
      })
      this.loading = false
    },
    async listarRelacionamentoRegistro (grupo) {
      this.loading = true
      this.filtroRelacionamento.grupo = grupo
      await this.listarRelacionamento({
        grupo: this.filtroRelacionamento.grupo || null,
        descricao: this.filtroRelacionamento.descricao || null
      })
      this.formulario = {
        grupo: grupo,
        item: null,
        descricao: null
      }
      this.modal = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || undefined,
          item: this.formulario.item || null,
          grupo: this.formulario.grupo || null,
          descricao: this.formulario.descricao || null
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)

        if (res && !res.erro) {
          this.modal = false
          this.resetFormulario()
          this.listarRegistro()
        }
        this.loading = false
      }
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.listarRegistro(this.formulario.grupo)
        this.modal = false
        this.resetFormulario()
      }
      this.loading = false
    },
    encontrarProximoItem (sequencia) {
      const valoresItem = sequencia.map((obj) => obj.item)
      const maiorItem = valoresItem && valoresItem.length ? Math.max(...valoresItem) : 0

      const proximoItem = maiorItem + 1

      return proximoItem
    },

    async exibirRegistro (registro) {
      this.loading = true
      const res = await this.exibir(registro.id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          created_at: res.created_at || null,
          created_by: res.created_by || null,
          item: res.item || null,
          grupo: res.grupo || null,
          descricao: res.descricao || null
        }
      }
      this.loading = false
      this.modal = true
      this.controle.exibir = true
    },
    async resetFormulario () {
      this.loading = true
      this.modal = false
      this.controle = {
        exibir: null,
        inserir: null,
        editar: null
      }
      this.formulario = {
        id: null,
        created_at: null,
        created_by: null,
        item: null,
        grupo: null,
        descricao: null
      }
      this.loading = false
    },
    limparFiltros () {
      this.filtro = {
        id: null,
        cnpj: null,
        status: null,
        tipo: null,
        razaoSocial: null,
        processo: null,
        dataVencimento: null
      }
    }
  }
}
</script>
