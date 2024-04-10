<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Opções"
    titulo="Opções"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @excluir="excluirRegistro()"
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
                @adicionar="controle.inserir = true, modal = true, formulario.item = encontrarProximoItem(registros), formulario.grupo = filtro.grupo"
                @pesquisar="listarRegistro()"
              >
                <template slot="filtros">
                  <v-container
                    class="my-0 py-0"
                    fluid
                  >
                    <v-row dense>
                      <v-col
                        xl="3"
                        lg="3"
                        md="10"
                        sm="12"
                        cols="12"
                      >
                        <v-autocomplete
                          v-model="filtro.grupo"
                          :items="dropdownGrupos"
                          hide-details
                          dense
                          item-value="item"
                          item-text="descricao"
                          label="Grupo"
                          outlined
                          @change="listarRegistro()"
                        />
                      </v-col>
                      <v-col
                        xl="4"
                        lg="4"
                        md="10"
                        sm="12"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.descricao"
                          v-uppercase
                          hide-details
                          dense
                          label="Descrição"
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
                titulo="Listagem de Opções"
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
                :xl="formulario.id ? 3 : 4"
                :lg="formulario.id ? 3 : 4"
                :md="formulario.id ? 3 : 4"
                :sm="formulario.id ? 5 : 4"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.grupo"
                  :items="dropdownGrupos"
                  disabled
                  hide-details
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Grupo"
                  class="required"
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
                  label="Item"
                  class="required"
                  outlined
                />
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="4"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Descrição"
                  vid="descricao"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.descricao"
                    v-uppercase
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="Descrição"
                    class="required"
                    outlined
                  />
                </validation-provider>
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
                  name="Cor"
                  vid="cor"
                  rules="required|max:7"
                >
                  <v-text-field
                    v-model="formulario.cor"
                    v-uppercase
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="Cor"
                    class="required"
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
                xl="3"
                lg="3"
                md="3"
                sm="3"
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
              <v-col
                v-if="formulario.id"
                xl="3"
                lg="3"
                md="3"
                sm="3"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.updated_by"
                  hide-details
                  disabled
                  dense
                  label="Última Alteração Por"
                  outlined
                />
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
                  v-model="formulario.updated_at"
                  hide-details
                  disabled
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'OpcoesGlobais',
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
        text: 'Grupo',
        align: 'start',
        sortable: false,
        value: 'grupo'
      },
      {
        text: 'Descrição Grupo',
        align: 'start',
        sortable: false,
        value: 'descricao_grupo'
      },
      {
        text: 'Item',
        align: 'start',
        sortable: false,
        value: 'item'
      },
      {
        text: 'Descrição',
        align: 'start',
        sortable: false,
        value: 'descricao'
      },
      {
        text: 'Cor',
        align: 'start',
        sortable: false,
        value: 'status'
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
      grupo: 1,
      descricao: null
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
      id: null,
      created_at: null,
      created_by: null,
      grupo: null,
      cor: null,
      item: null,
      descricao: null,
      updated_at: null,
      updated_by: null
    },
    paginacao: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    modal: false
  }),
  computed: {
    ...mapState('opcoes', [
      'registros',
      'registrosRelacionamento',
      'dropdownGrupos'
    ]),
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(this.filtro.descricao || this.filtro.grupo)
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
    await this.buscarDropdownGrupos(1) // GRUPOS DE OPÇOES
    this.listarRegistro()
  },
  methods: {
    ...mapMutations('opcoes', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('opcoes', [
      'listar',
      'exibir',
      'salvar',
      'editar',
      'excluir',
      'listarRelacionamento',
      'buscarDropdownGrupos'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        grupo: this.filtro.grupo || null,
        descricao: this.filtro.descricao || null
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
          cor: this.formulario.cor || null,
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
      const res = await this.exibir(registro)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by || null,
          cor: res.cor || null,
          item: res.item || null,
          grupo: res.grupo || null,
          descricao: res.descricao || null,
          updated_at: res.updated_at ? this.$day(res.updated_at).format('DD/MM/YYYY HH:mm:ss') : null,
          updated_by: res.updated_by || null
        }
      }
      this.loading = false
      this.modal = true
      this.controle.exibir = true
    },
    async resetFormulario () {
      this.loading = true
      await this.buscarDropdownGrupos(1) // GRUPOS DE OPÇOES
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
        descricao: null,
        updated_at: null,
        updated_by: null
      }
      this.loading = false
    },
    limparFiltros () {
      this.filtro = {
        grupo: 1,
        descricao: null
      }
    }
  }
}
</script>
