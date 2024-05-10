<template>
  <pagina
    :loading="loading"
    :modal="modal"
    subtitulo="Página de Manutenção de Processos Licenciamento"
    titulo="Processos"
    :mais-opcoes="formulario.id ? maisOpcoes : null"
    :titulo-formulario="controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro'"
    @excluir="aviso = { modal: true, text: 'Deseja excluir esse registro?', key: 'excluirRegistro'}"
    @voltar="resetFormulario()"
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
      @excluirLicencaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, excluirLicencaRegistro()"
      @ativarLicencaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, ativarLicencaRegistro()"
      @excluirRmaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, excluirRmaRegistro()"
      @encerrarLicencaRegistro="aviso = {
        modal: false,
        text: '',
        key: ''
      }, encerrarLicencaRegistro()"
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
                @clearFilters="limparFiltros()"
                @adicionar="controle.inserir = true, modal = true, formulario.status_licenca_id === enumStatusLicenca.digitacao"
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
                        sm="8"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.cnpj"
                          v-mask="['###.###.###-##', '##.###.###/####-##']"
                          hide-details
                          dense
                          label="CNPJ/CPF"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="2"
                        lg="2"
                        md="6"
                        sm="4"
                        cols="12"
                      >
                        <v-text-field
                          v-model="filtro.processo"
                          hide-details
                          dense
                          label="Processo"
                          outlined
                        />
                      </v-col>
                      <v-col
                        xl="7"
                        lg="7"
                        md="12"
                        sm="8"
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
                :paginacao="paginacao"
                :registros-por-pagina="100"
                :sort-by-cli="['id']"
                :sort-desc-cli="true"
                height-auto
                exibir
                class="mt-2"
                toolbar-grid
                titulo="Listagem de Processos"
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
                xl="2"
                lg="2"
                md="2"
                sm="2"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.id"
                  hide-details
                  disabled
                  dense
                  label="Código Processo"
                  outlined
                />
              </v-col>
              <v-col
                :xl="formulario.id ? 10 : 12"
                :lg="formulario.id ? 10 : 12"
                :md="formulario.id ? 10 : 12"
                :sm="formulario.id ? 10 : 12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Processo"
                  vid="processo"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.processo"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="!controle.inserir"
                    dense
                    label="Processo"
                    class="required"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                xl="12"
                lg="12"
                md="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Observação"
                  rules="max:500"
                  vid="observacao"
                >
                  <v-textarea
                    v-model="formulario.observacao"
                    v-uppercase
                    :disabled="!controle.inserir && !controle.editar"
                    :error-messages="errors"
                    :hide-details="!(errors.length || (formulario.observacao && formulario.observacao.length > 0) && !controle.exibir)"
                    :counter="500"
                    dense
                    label="Observação"
                    outlined
                    rows="3"
                    spellcheck="false"
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
              <v-col
                cols="12"
              >
                Empresa
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
                  name="Empresa"
                  vid="Empresa"
                  rules="required"
                >
                  <v-text-field
                    v-model="formulario.empresa_id"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    append-icon="mdi-magnify"
                    dense
                    label="Empresa (clique na lupa)"
                    outlined
                    class="required"
                    @click:append="modalBuscarEmpresa = true"
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
                <v-text-field
                  v-model="formulario.cnpj"
                  v-mask="['###.###.###-##', '##.###.###/####-##']"
                  disabled
                  hide-details
                  dense
                  label="CNPJ/CPF"
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
                  v-model="formulario.status_empresa_id"
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
                xl="6"
                lg="6"
                md="4"
                sm="6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.nome_fantasia"
                  v-uppercase
                  disabled
                  hide-details
                  dense
                  label="Nome Fantasia"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="5"
                sm="6"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.razao_social"
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
                  v-model="formulario.data_cadastro"
                  v-mask="'##/##/####'"
                  disabled
                  hide-details
                  dense
                  label="Data de Cadastro"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="5"
                sm="8"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.porte_empresa_id"
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
                xl="4"
                lg="4"
                md="12"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.empresa_endereco"
                  disabled
                  hide-details
                  dense
                  label="Endereço Empresa"
                  outlined
                />
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="6"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Estado Empresa"
                  rules="required"
                  vid="estadoEmpresa"
                >
                  <v-autocomplete
                    v-model="formulario.estado_empresa"
                    :items="dropdownEstados"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    disabled
                    dense
                    item-value="uf"
                    item-text="nome"
                    label="Estado"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="2"
                lg="2"
                md="6"
                sm="6"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Cidade Empresa"
                  rules="required"
                  vid="cidadeEmpresa"
                >
                  <v-autocomplete
                    v-model="formulario.cidade_empresa"
                    :items="dropdownCidadesEmpresa"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    disabled
                    dense
                    item-value="codigo"
                    item-text="nome"
                    label="Cidade"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
              >
                <v-divider />
              </v-col>
            </v-row>
          </v-container>
        </validation-observer>
      </v-form>
    </template>

    <template
      v-if="formulario.id"
      slot="relacionamento"
    >
      <v-card
        class="elevation-0 ma-2 pa-2"
        outlined
      >
        <v-form @submit.prevent="''">
          <v-container
            fluid
            grid-list-xs
          >
            <v-row dense>
              <v-col
                xl="8"
                lg="8"
                md="7"
                sm="6"
                cols="12"
              >
                Listagem de Licenças
              </v-col>
              <v-col
                xl="1"
                lg="1"
                md="1"
                sm="1"
                cols="12"
              >
                <v-btn
                  small
                  block
                  color="primary"
                  @click="listarLicencasRegistros()"
                >
                  <v-icon dark>
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="4"
                sm="5"
                cols="12"
              >
                <v-btn
                  small
                  block
                  color="primary"
                  @click="modalLicenca = true, controleLicenca.inserir = true, formularioLicenca.status_licenca_id = enumStatusLicenca.digitacao"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                  Adicionar Nova Licença
                </v-btn>
              </v-col>
              <v-col
                xl="12"
                lg="12"
                md="12"
                sm="12"
                cols="12"
              >
                <tabela
                  :colunas="colunasLicencas"
                  :registros="registrosLicencas"
                  :paginacao="paginacaoLicencas"
                  :registros-por-pagina="100"
                  :sort-by-cli="['id']"
                  :sort-desc-cli="true"
                  height-auto
                  exibir
                  @paginacao="paginacaoLicencas = $event"
                  @exibir="exibirLicencaRegistro($event), modalLicenca = true"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
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

    <modal
      v-model="modalBuscarEmpresa"
      width="100%"
      :titulo="'Pesquisar Empresa'"
      :mais-opcoes="false"
      @fechar="resetModalEmpresa()"
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
                  :options="optionsFilterModalBuscarEmpresa"
                  @clearFilters="limparFiltrosModalEmpresa()"
                  @pesquisar="listarRegistroEmpresas()"
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
                            v-mask="['###.###.###-##', '##.###.###/####-##']"
                            hide-details
                            dense
                            label="CNPJ/CPF"
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
                            disabled
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
                  :paginacao="paginacaoEmpresas"
                  :registros-por-pagina="100"
                  :sort-by-cli="['id']"
                  :sort-desc-cli="true"
                  height-auto
                  class="mt-2"
                  toolbar-grid
                  titulo="Listagem de Empresas"
                  escolher
                  @paginacao="paginacaoEmpresas = $event"
                  @escolher="resetModalEmpresa(), exibirRegistroEmpresa($event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </modal>

    <modal
      v-model="modalLicenca"
      width="100%"
      :titulo="'Licença'"
      :mais-opcoes="!!formularioLicenca.id"
      @fechar="resetModalLicenca()"
    >
      <template slot="maisOpcoes">
        <v-list-item
          v-if="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.digitacao)"
          @click="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.digitacao) ?
          aviso = { modal: true, text: 'Essa ação não poderá ser desfeita. Deseja continuar?', key: 'ativarLicencaRegistro'} :
          $notificacao('Só é possível ativar licença em digitação.', 'erro')"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'primary'">
              mdi-check
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Ativar Licença
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.ativa)"
          @click="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.ativa) ?
          aviso = { modal: true, text: 'Essa ação não poderá ser desfeita. Deseja continuar?', key: 'encerrarLicencaRegistro'} :
          $notificacao('Só é possível encerrar licença ativa.', 'erro')"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'error'">
              mdi-cancel
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Encerrar Licença
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="formularioAnexo = {
            value: true,
            titulo: 'da Licença',
            tabela: 'licenca',
            tabelaId: formularioLicenca.id,
            tipoGrupoId: 8,
            subTipoGrupoId: 1
          }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'primary'">
              mdi-paperclip
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Anexos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.digicacao) ?
          aviso = { modal: true, text: 'Deseja excluir esse registro?', key: 'excluirLicencaRegistro'} :
          $notificacao('Só é possível excluir licença em digitação.', 'erro')"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'error'">
              mdi-delete
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Excluir Licença
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template slot="botoes">
        <v-btn
          v-if="!!(!controleLicenca.exibir && (controleLicenca.inserir || controleLicenca.editar))"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="salvarLicencaRegistro()"
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
          v-if="!!(controleLicenca.exibir && !controleLicenca.inserir)"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="Number(formularioLicenca.status_licenca_id) === Number(enumStatusLicenca.digitacao) ?
          (controleLicenca.editar = true, controleLicenca.exibir = false) :
          $notificacao('Só é possível editar licença em digitação.', 'erro')"
        >
          <v-icon
            left
            size="20"
          >
            mdi-pencil
          </v-icon>
          Editar
        </v-btn>
      </template>
      <template>
        <v-form @submit.prevent="''">
          <validation-observer ref="observerLicenca">
            <v-container
              class="ma-0 pa-0"
              fluid
            >
              <v-row dense>
                <v-col
                  v-show="formularioLicenca.id"
                  xl="2"
                  lg="2"
                  md="2"
                  sm="4"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioLicenca.id"
                    hide-details
                    disabled
                    dense
                    label="Código Licença"
                    outlined
                  />
                </v-col>
                <v-col
                  :xl="formularioLicenca.id ? 2 : 3"
                  :lg="formularioLicenca.id ? 2 : 3"
                  :md="formularioLicenca.id ? 2 : 3"
                  sm="4"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Licença"
                    rules="required"
                    vid="licenca"
                  >
                    <v-text-field
                      v-model="formularioLicenca.licenca"
                      :disabled="controleLicenca.exibir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      dense
                      label="Licença"
                      class="required"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  :xl="formularioLicenca.id ? 2 : 3"
                  :lg="formularioLicenca.id ? 2 : 3"
                  :md="formularioLicenca.id ? 2 : 3"
                  sm="4"
                  cols="12"
                >
                  <v-autocomplete
                    v-model="formularioLicenca.status_licenca_id"
                    :items="dropdownStatusLicencas"
                    disabled
                    hide-details
                    dense
                    item-value="item"
                    item-text="descricao"
                    label="Status"
                    outlined
                  />
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
                    name="Porte Licença"
                    rules="required"
                    vid="porte_licenca_id"
                  >
                    <v-autocomplete
                      v-model="formularioLicenca.porte_licenca_id"
                      :items="dropdownPorteLicencas"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controleLicenca.exibir"
                      dense
                      class="required"
                      item-value="item"
                      item-text="descricao"
                      label="Porte Licença"
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
                    name="Tipo Licença"
                    rules="required"
                    vid="tipo_licenca_id"
                  >
                    <v-autocomplete
                      v-model="formularioLicenca.tipo_licenca_id"
                      :items="dropdownTiposLicencas"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controleLicenca.exibir"
                      dense
                      class="required"
                      item-value="item"
                      item-text="descricao"
                      label="Tipo Licença"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  xl="3"
                  lg="3"
                  md="3"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Data de Vencimento"
                    rules="required"
                    vid="data_vencimento"
                  >
                    <v-text-field
                      v-model="formularioLicenca.data_vencimento"
                      v-mask="'##/##/####'"
                      :disabled="controleLicenca.exibir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      label="Data de Vencimento"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  xl="3"
                  lg="3"
                  md="3"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Data de Saída"
                    rules="required"
                    vid="data_saida"
                  >
                    <v-text-field
                      v-model="formularioLicenca.data_saida"
                      v-mask="'##/##/####'"
                      :disabled="controleLicenca.exibir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      label="Data de Saída"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Observação"
                    rules="max:500"
                    vid="observacao"
                  >
                    <v-textarea
                      v-model="formularioLicenca.observacao"
                      v-uppercase
                      :disabled="controleLicenca.exibir"
                      :error-messages="errors"
                      :hide-details="!(errors.length || (formularioLicenca.observacao && formularioLicenca.observacao.length > 0) && !controleLicenca.exibir)"
                      :counter="500"
                      dense
                      label="Observação"
                      outlined
                      rows="3"
                      spellcheck="false"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  v-show="formularioLicenca.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioLicenca.created_by"
                    hide-details
                    disabled
                    dense
                    label="Criado Por"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioLicenca.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioLicenca.created_at"
                    hide-details
                    disabled
                    dense
                    label="Criado Em"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioLicenca.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioLicenca.updated_by"
                    hide-details
                    disabled
                    dense
                    label="Última Alteração Por"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioLicenca.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioLicenca.updated_at"
                    hide-details
                    disabled
                    dense
                    label="Última Alteração Em"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-card
                   outlined
                  >
                    <v-container
                      class="my-2 pa-0 px-1"
                      fluid
                    >
                      <v-row dense>
                        <v-col
                          xl="6"
                          lg="6"
                          md="5"
                          sm="4"
                          cols="12"
                        >
                          Relatórios de Monitoramento Ambiental
                        </v-col>
                        <v-col
                          xl="2"
                          lg="2"
                          md="2"
                          sm="12"
                          cols="12"
                        >
                          <v-btn
                            small
                            block
                            color="warning"
                            @click="formularioLicenca.status_licenca_id === enumStatusLicenca.ativa ?
                            gerarRmaRegistro() :
                            $notificacao('Só é possível gerar RMAS em licenças ATIVAS.', 'erro')"
                          >
                            <v-icon dark>
                              mdi-plus-thick
                            </v-icon>
                            Gerar RMAs
                          </v-btn>
                        </v-col>
                        <v-col
                          xl="1"
                          lg="1"
                          md="1"
                          sm="12"
                          cols="12"
                        >
                          <v-btn
                            small
                            block
                            color="primary"
                            @click="listarRmaRegistro()"
                          >
                            <v-icon dark>
                              mdi-refresh
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col
                          xl="3"
                          lg="3"
                          md="4"
                          sm="12"
                          cols="12"
                        >
                          <v-btn
                            small
                            block
                            color="primary"
                            @click="formularioLicenca.status_licenca_id === enumStatusLicenca.ativa ?
                            (modalRma = true, controleRma.inserir = true, formularioRma.status_rma_id = enumStatusRma.digitacao) :
                            $notificacao('Só é possível criar RMAS em licenças ATIVAS.', 'erro')"
                          >
                            <v-icon dark>
                              mdi-plus
                            </v-icon>
                            Adicionar Novo RMA
                          </v-btn>
                        </v-col>
                        <v-col
                          xl="12"
                          lg="12"
                          md="12"
                          sm="12"
                          cols="12"
                        >
                          <tabela
                            :colunas="colunasRma"
                            :registros="registrosRma"
                            :paginacao="paginacaoRma"
                            :registros-por-pagina="100"
                            :sort-by-cli="['id']"
                            :sort-desc-cli="true"
                            height-auto
                            exibir
                            @paginacao="paginacaoRma = $event"
                            @exibir="exibirRmaRegistro($event), modalRma = true"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </validation-observer>
        </v-form>
      </template>
    </modal>

    <modal
      v-model="modalRma"
      width="100%"
      :titulo="'Rma'"
      :mais-opcoes="!!formularioRma.id"
      @fechar="resetModalRma()"
    >
      <template slot="maisOpcoes">
        <v-list-item
          @click="Number(formularioRma.status_rma_id) === Number(enumStatusRma.digitacao) ?
          aviso = { modal: true, text: 'Deseja excluir esse registro?', key: 'excluirRmaRegistro'} :
          $notificacao('Só é possível excluir rma em digitação.', 'erro')"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'error'">
              mdi-delete
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Excluir RMA
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="formularioAnexo = {
            value: true,
            titulo: 'do RMA',
            tabela: 'rma',
            tabelaId: formularioRma.id,
            tipoGrupoId: 8,
            subTipoGrupoId: 2
          }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="'primary'">
              mdi-paperclip
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Anexos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template slot="botoes">
        <v-btn
          v-if="!!(!controleRma.exibir && (controleRma.inserir || controleRma.editar))"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="salvarRmaRegistro()"
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
          v-if="!!(controleRma.exibir && !controleRma.inserir)"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="Number(formularioRma.status_rma_id) === Number(enumStatusRma.digitacao) ?
          (controleRma.editar = true, controleRma.exibir = false) :
          $notificacao('Só é possível editar Rma em digitação.', 'erro')"
        >
          <v-icon
            left
            size="20"
          >
            mdi-pencil
          </v-icon>
          Editar
        </v-btn>
      </template>
      <template>
        <v-form @submit.prevent="''">
          <validation-observer ref="observerRma">
            <v-container
              class="ma-0 pa-0"
              fluid
            >
              <v-row dense>
                <v-col
                  v-show="formularioRma.id"
                  xl="2"
                  lg="2"
                  md="1"
                  sm="4"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioRma.id"
                    hide-details
                    disabled
                    dense
                    label="Código Rma"
                    outlined
                  />
                </v-col>
                <v-col
                  :xl="formularioRma.id ? 2 : 3"
                  :lg="formularioRma.id ? 2 : 3"
                  :md="formularioRma.id ? 2 : 3"
                  sm="4"
                  cols="12"
                >
                  <v-autocomplete
                    v-model="formularioRma.status_rma_id"
                    :items="dropdownStatusRma"
                    disabled
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
                  md="3"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Data Inicial"
                    rules="required"
                    vid="data_inicial"
                  >
                    <v-text-field
                      v-model="formularioRma.periodo_inicio"
                      v-mask="'##/##/####'"
                      :disabled="controleRma.exibir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      label="Data de Inicio"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  xl="3"
                  lg="3"
                  md="3"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Data Fim"
                    rules="required"
                    vid="data_fim"
                  >
                    <v-text-field
                      v-model="formularioRma.periodo_fim"
                      v-mask="'##/##/####'"
                      :disabled="controleRma.exibir"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      class="required"
                      dense
                      label="Data Fim"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Observação"
                    rules="max:500"
                    vid="observacao"
                  >
                    <v-textarea
                      v-model="formularioRma.observacao"
                      v-uppercase
                      :disabled="controleRma.exibir"
                      :error-messages="errors"
                      :hide-details="!(errors.length || (formularioRma.observacao && formularioRma.observacao.length > 0) && !controleRma.exibir)"
                      :counter="500"
                      dense
                      label="Observação"
                      outlined
                      rows="3"
                      spellcheck="false"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  v-show="formularioRma.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioRma.created_by"
                    hide-details
                    disabled
                    dense
                    label="Criado Por"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioRma.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioRma.created_at"
                    hide-details
                    disabled
                    dense
                    label="Criado Em"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioRma.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioRma.updated_by"
                    hide-details
                    disabled
                    dense
                    label="Última Alteração Por"
                    outlined
                  />
                </v-col>
                <v-col
                  v-show="formularioRma.id"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="6"
                  cols="12"
                >
                  <v-text-field
                    v-model="formularioRma.updated_at"
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
    </modal>

    <anexo
      :value="formularioAnexo.value"
      :titulo="formularioAnexo.titulo"
      :tabela="formularioAnexo.tabela"
      :tabela-id="formularioAnexo.tabelaId"
      :tipo-grupo-id="formularioAnexo.tipoGrupoId"
      :subtipo-grupo-id="formularioAnexo.subTipoGrupoId"
      @fechar="resetFormularioAnexo"
    />
  </pagina>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { filter } from 'vue-input-facade'

export default {
  name: 'TelaLicencas',
  data: () => ({
    loading: false,
    modalBuscarEmpresa: false,
    modalLicenca: false,
    modalRma: false,
    aviso: {
      modal: false,
      conteudo: '',
      acao: ''
    },
    colunasRma: [
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
        text: 'Data Inicio',
        align: 'start',
        sortable: false,
        value: 'periodo_inicio'
      },
      {
        text: 'Data Final',
        align: 'start',
        sortable: false,
        value: 'periodo_fim'
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
    colunasLicencas: [
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
        text: 'Licença',
        align: 'start',
        sortable: false,
        value: 'licenca'
      },
      {
        text: 'Status',
        align: 'start',
        sortable: false,
        value: 'status'
      },
      {
        text: 'Porte',
        align: 'start',
        sortable: false,
        value: 'porte_descricao'
      },
      {
        text: 'Tipo',
        align: 'start',
        sortable: false,
        value: 'tipo'
      },
      {
        text: 'Data Saída',
        align: 'start',
        sortable: false,
        value: 'data_saida'
      },
      {
        text: 'Data Vencimento',
        align: 'start',
        sortable: false,
        value: 'data_vencimento'
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
        text: 'CNPJ/CPF',
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
        text: 'CNPJ/CPF',
        align: 'start',
        sortable: false,
        value: 'cnpj'
      },
      {
        text: 'Razão Social/Nome',
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
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    controleLicenca: {
      exibir: false,
      editar: false,
      inserir: false
    },
    controleRma: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      processo: null,
      observacao: null,
      created_at: null,
      created_by: null,
      updated_at: null,
      updated_by: null,
      empresa_id: null,
      cnpj: null,
      status_empresa_id: null,
      nome_fantasia: null,
      razao_social: null,
      data_cadastro: null,
      porte_empresa_id: null,
      empresa_endereco: null,
      estado_empresa: null,
      cidade_empresa: null
    },
    formularioEmpresa: {
      id: null,
      cnpj: null,
      status: null,
      nomeFantasia: null,
      razaoSocial: null,
      dataCadastro: null,
      porte: null,
      empresa_endereco: null,
      estado: null,
      cidade: null,
      created_at: null,
      created_by: null
    },
    formularioLicenca: {
      id: null,
      licenca: null,
      status_licenca_id: null,
      porte_licenca_id: null,
      tipo_licenca_id: null,
      data_vencimento: null,
      data_saida: null,
      observacao: null,
      created_at: null,
      created_by: null,
      updated_at: null,
      updated_by: null
    },
    formularioAnexo: {
      value: false,
      titulo: null,
      tabela: null,
      tabelaId: null,
      tipoGrupoId: null,
      subTipoGrupoId: null
    },
    formularioRma: {
      id: null,
      status_rma_id: null,
      observacao: null,
      arquivo_submetido: null,
      periodo_inicio: null,
      periodo_fim: null,
      created_at: null,
      created_by: null,
      updated_at: null,
      updated_by: null
    },
    enumStatusLicenca: {
      digitacao: 1,
      ativa: 2
    },
    enumStatusRma: {
      digitacao: 1
    },
    enumStatusEmpresas: {
      digitacao: 1,
      ativa: 2
    },
    paginacao: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    paginacaoEmpresas: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    paginacaoLicencas: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    paginacaoRma: {
      pagina: 1,
      registros: 100,
      totalRegistros: 0
    },
    modal: false
  }),
  computed: {
    ...mapState('processo', [
      'registros',
      'registrosRma',
      'registrosLicencas',
      'registrosEmpresas',
      'dropdownStatusLicencas',
      'dropdownStatusRma',
      'dropdownPorteLicencas',
      'dropdownTiposLicencas',
      'dropdownStatusEmpresa',
      'dropdownPortesEmpresa',
      'dropdownEstados',
      'dropdownCidadesEmpresa',
      'dropdownCidades'
    ]),
    optionsFilterModalBuscarEmpresa () {
      return {
        adicionar: false,
        values: !!(
          this.filtroModalEmpresa.id ||
          this.filtroModalEmpresa.cnpj ||
          (this.filtroModalEmpresa.status
            ? this.filtroModalEmpresa.status.length
            : null) ||
          this.filtroModalEmpresa.nomeFantasia ||
          this.filtroModalEmpresa.razaoSocial ||
          (this.filtroModalEmpresa.porte
            ? this.filtroModalEmpresa.porte.length
            : null)
        )
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
  watch: {
    async 'formularioEmpresa.estado' (value) {
      if (value && (this.formularioEmpresa.estado === 'RO' || this.formularioEmpresa.estado === 'AM' || this.formularioEmpresa.estado === 'AC')) await this.buscarDropdownCidadeEmpresa(value)
    },
    async 'formulario.estado' (value) {
      if (value && (this.formulario.estado === 'RO' || this.formulario.estado === 'AM' || this.formulario.estado === 'AC')) await this.buscarDropdownCidade(value)
    },
    async 'formulario.estado_empresa' (value) {
      if (value && (this.formulario.estado_empresa === 'RO' || this.formulario.estado_empresa === 'AM' || this.formulario.estado_empresa === 'AC')) await this.buscarDropdownCidadeEmpresa(value)
    },
    'formulario.empresa_id' (value) {
      if (!value) {
        this.formulario.bairro = null
        this.formulario.cep = null
        this.formulario.cidade_empresa = null
        this.formulario.cnpj = null
        this.formulario.complemento = null
        this.formulario.data_cadastro = null
        this.formulario.empresa_id = null
        this.formulario.estado_empresa = null
        this.formulario.logradouro = null
        this.formulario.nome_fantasia = null
        this.formulario.numero = null
        this.formulario.empresa_endereco = null
        this.formulario.porte_empresa_id = null
        this.formulario.razao_social = null
        this.formulario.status_empresa_id = null
      }
    }
  },
  async created () {
    if (this.$route.query && this.$route.query.id) {
      this.filtro.id = this.$route.query.id
    }
    await this.buscarDropdownTiposLicencas()
    await this.buscarDropdownPorteLicencas()
    await this.buscarDropdownStatusLicencas()
    await this.buscarDropdownStatusRma()
    await this.buscarDropdownPortesEmpresa()
    await this.buscarDropdownStatusEmpresa()
    await this.buscarDropdownEstados()
    this.listarRegistro()
    this.listarRegistroEmpresas()
  },
  methods: {
    ...mapMutations('processo', [
      'setRegistrosEmpresas',
      'setRegistrosLicencas',
      'setRegistrosRma',
      'setRegistro'
    ]),
    ...mapActions('processo', [
      'listar',
      'exibir',
      'salvar',
      'editar',
      'excluir',
      'buscarDropdownStatusLicencas',
      'buscarDropdownTiposLicencas',
      'buscarDropdownPorteLicencas',

      'listarEmpresas',
      'exibirEmpresas',
      'buscarDropdownPortesEmpresa',
      'buscarDropdownStatusEmpresa',
      'buscarDropdownEstados',
      'buscarDropdownCidade',
      'buscarDropdownCidadeEmpresa',

      'listarLicencas',
      'exibirLicenca',
      'salvarLicenca',
      'editarLicenca',
      'excluirLicenca',
      'ativarLicenca',
      'encerrarLicenca',

      'listarRma',
      'exibirRma',
      'editarRma',
      'salvarRma',
      'excluirRma',
      'gerarRma',
      'buscarDropdownStatusRma'
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
    async exibirRegistro (registro) {
      this.loading = true
      const res = await this.exibir(registro)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          processo: res.processo || null,
          observacao: res.observacao || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by || null,
          updated_at: res.updated_at ? this.$day(res.updated_at).format('DD/MM/YYYY HH:mm:ss') : null,
          updated_by: res.updated_by || null,
          empresa_id: res.empresa_id || null,
          cnpj: res.cnpj ? (String(res.cnpj).length <= 11 ? filter(String(res.cnpj).padStart(11, '0'), ['###.###.###-##']) : filter(String(res.cnpj).padStart(14, '0'), ['##.###.###/####-##'])) : '-',
          status_empresa_id: res.status_empresa_id || null,
          nome_fantasia: res.nome_fantasia || null,
          razao_social: res.razao_social || null,
          data_cadastro: res.data_cadastro ? this.$day(res.data_cadastro).format('DD/MM/YYYY HH:mm:ss') : null,
          porte_empresa_id: res.porte_empresa_id || null,
          empresa_endereco: `${res.logradouro}, ${res.numero} - ${res.bairro}`,
          estado_empresa: res.estado_empresa || null,
          cidade_empresa: res.cidade_empresa || null
        }

        this.listarLicencasRegistros()
      }
      this.loading = false
      this.modal = true
      this.controle.exibir = true
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || null,
          processo: this.formulario.processo || null,
          empresa_id: this.formulario.empresa_id || null,
          observacao: this.formulario.observacao || null
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)

        if (res && !res.erro) {
          this.modal = false
          this.resetFormulario()
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
      }
      this.loading = false
    },
    // LICENCA
    async listarLicencasRegistros () {
      this.loading = true
      const res = await this.listarLicencas({
        processo_id: this.formulario.id
      })
      if (res && !res.erro) {
      }
      this.loading = false
    },
    async exibirLicencaRegistro (registro) {
      this.loading = true
      const res = await this.exibirLicenca(registro)
      if (res && !res.erro) {
        this.formularioLicenca = {
          id: res.id || null,
          processo_id: res.processo_id || null,
          observacao: res.observacao || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by || null,
          updated_at: res.updated_at ? this.$day(res.updated_at).format('DD/MM/YYYY HH:mm:ss') : null,
          updated_by: res.updated_by || null,
          licenca: res.licenca || null,
          status_licenca_id: res.status_licenca_id || null,
          porte_licenca_id: res.porte_licenca_id || null,
          tipo_licenca_id: res.tipo_licenca_id || null,
          data_vencimento: res.data_vencimento ? this.$day(res.data_vencimento).format('DD/MM/YYYY') : null,
          data_saida: res.data_saida ? this.$day(res.data_saida).format('DD/MM/YYYY') : null
        }
        if (this.formularioLicenca.id) this.listarRmaRegistro()
      }
      this.loading = false
      this.controleLicenca.exibir = true
    },
    async salvarLicencaRegistro () {
      if (await this.$refs.observerLicenca.validate()) {
        const dataCadastro = this.$dataValidade(this.formularioLicenca.data_saida)
        if (dataCadastro) {
          if (dataCadastro) this.$refs.observerLicenca.setErrors({ data_saida: [dataCadastro] })
          return
        }
        const dataVencimento = this.$dataValidade(this.formularioLicenca.data_vencimento)
        if (dataVencimento) {
          if (dataVencimento) this.$refs.observerLicenca.setErrors({ data_vencimento: [dataVencimento] })
          return
        }
        this.loading = true
        const form = {
          id: this.formularioLicenca.id || null,
          processo_id: this.formulario.id || null,
          licenca: this.formularioLicenca.licenca || null,
          porte_licenca_id: this.formularioLicenca.porte_licenca_id || null,
          tipo_licenca_id: this.formularioLicenca.tipo_licenca_id || null,
          data_vencimento: this.formularioLicenca.data_vencimento ? this.$day(this.formularioLicenca.data_vencimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          data_saida: this.formularioLicenca.data_saida ? this.$day(this.formularioLicenca.data_saida, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          observacao: this.formularioLicenca.observacao || null
        }

        let res
        if (form.id) res = await this.editarLicenca(form)
        else res = await this.salvarLicenca(form)

        if (res && !res.erro) {
          this.resetFormularioLicenca()
          this.exibirLicencaRegistro(res.id)
          this.controleLicenca = {
            exibir: false,
            editar: false,
            inserir: false
          }
        }
        this.loading = false
      }
    },
    async excluirLicencaRegistro () {
      this.loading = true
      const res = await this.excluirLicenca(this.formularioLicenca.id)
      if (res && !res.erro) {
        this.resetModalLicenca()
      }
      this.loading = false
    },
    async ativarLicencaRegistro () {
      this.loading = true
      const res = await this.ativarLicenca(this.formularioLicenca)
      if (res && !res.erro) {
        this.exibirLicencaRegistro(this.formularioLicenca.id)
      }
      this.loading = false
    },
    async encerrarLicencaRegistro () {
      this.loading = true
      const res = await this.encerrarLicenca(this.formularioLicenca)
      if (res && !res.erro) {
        this.exibirLicencaRegistro(this.formularioLicenca.id)
      }
      this.loading = false
    },
    // RMA
    async listarRmaRegistro () {
      this.loading = true
      await this.listarRma({
        licenca_id: this.formularioLicenca.id || null
      })
      this.loading = false
    },
    async exibirRmaRegistro (registro) {
      this.loading = true
      const res = await this.exibirRma(registro)
      if (res && !res.erro) {
        this.formularioRma = {
          id: res.id || null,
          status_rma_id: res.status_rma_id || null,
          observacao: res.observacao || null,
          arquivo_submetido: res.arquivo_submetido || null,
          periodo_inicio: res.periodo_inicio ? this.$day(res.periodo_inicio).format('DD/MM/YYYY') : null,
          periodo_fim: res.periodo_fim ? this.$day(res.periodo_fim).format('DD/MM/YYYY') : null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by || null,
          updated_at: res.updated_at ? this.$day(res.updated_at).format('DD/MM/YYYY HH:mm:ss') : null,
          updated_by: res.updated_by || null
        }
      }
      this.loading = false
      this.controleRma.exibir = true
    },
    async gerarRmaRegistro () {
      this.loading = true
      if (this.registrosRma && this.registrosRma.length) {
        this.$notificacao('Só é possível gerar RMAS se não houver RMAS criados.', 'erro')
      } else {
        const res = await this.gerarRma({
          id: this.formularioLicenca.id,
          data_inicial_licenca: this.formularioLicenca.data_saida ? this.$day(this.formularioLicenca.data_saida, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          data_final_licenca: this.formularioLicenca.data_vencimento ? this.$day(this.formularioLicenca.data_vencimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
        })
        if (res && !res.erro) {
          this.exibirLicencaRegistro(this.formularioLicenca.id)
        }
      }
      this.loading = false
    },
    async salvarRmaRegistro () {
      if (await this.$refs.observerRma.validate()) {
        const periodoInicio = this.$dataValidade(this.formularioRma.periodo_inicio)
        if (periodoInicio) {
          if (periodoInicio) this.$refs.observerRma.setErrors({ periodo_inicio: [periodoInicio] })
          return
        }
        const periodoFim = this.$dataValidade(this.formularioRma.periodo_fim)
        if (periodoFim) {
          if (periodoFim) this.$refs.observerRma.setErrors({ periodo_fim: [periodoFim] })
          return
        }
        this.loading = true
        const form = {
          id: this.formularioRma.id || null,
          licenca_id: this.formularioLicenca.id || null,
          observacao: this.formularioRma.observacao || null,
          periodo_inicio: this.formularioRma.periodo_inicio || null,
          periodo_fim: this.formularioRma.periodo_fim || null
        }

        let res
        if (form.id) res = await this.editarRma(form)
        else res = await this.salvarRma(form)

        if (res && !res.erro) {
          this.resetFormularioRma()
          this.exibirRmaRegistro(res.id)
          this.controleRma = {
            exibir: false,
            editar: false,
            inserir: false
          }
          this.listarRmaRegistro()
        }
        this.loading = false
      }
    },
    async excluirRmaRegistro () {
      this.loading = true
      const res = await this.excluirRma(this.formularioRma.id)
      if (res && !res.erro) {
        this.resetModalRma()
        this.listarRmaRegistro()
      }
      this.loading = false
    },
    // EMPRESA MODAL
    async listarRegistroEmpresas () {
      this.loading = true
      this.filtroModalEmpresa.status = [this.enumStatusEmpresas.ativa]
      await this.listarEmpresas({
        id: this.filtroModalEmpresa.id || null,
        cnpj: this.filtroModalEmpresa.cnpj ? String(this.filtroModalEmpresa.cnpj).match(/\d/g).join('') : undefined,
        status: this.filtroModalEmpresa.status && this.filtroModalEmpresa.status.length ? this.filtroModalEmpresa.status : null,
        nomeFantasia: this.filtroModalEmpresa.nomeFantasia || null,
        razaoSocial: this.filtroModalEmpresa.razaoSocial || null,
        porteEmpresa: this.filtroModalEmpresa.porte && this.filtroModalEmpresa.porte.length ? this.filtroModalEmpresa.porte : null
      })
      this.loading = false
    },
    async exibirRegistroEmpresa (id) {
      this.loading = true
      const res = await this.exibirEmpresas(id)
      if (res && !res.erro) {
        const formularioEmpresa = {
          empresa_id: res.id || null,
          cnpj: res.cnpj ? (String(res.cnpj).length <= 11 ? filter(String(res.cnpj).padStart(11, '0'), ['###.###.###-##']) : filter(String(res.cnpj).padStart(14, '0'), ['##.###.###/####-##'])) : '-',
          status_empresa_id: res.status_empresa_id || null,
          nome_fantasia: res.nome_fantasia || null,
          razao_social: res.razao_social || null,
          data_cadastro: res.data_cadastro ? this.$day(res.data_cadastro).format('DD/MM/YYYY HH:mm:ss') : null,
          porte_empresa_id: res.porte_empresa_id || null,
          empresa_endereco: `${res.logradouro}, ${res.numero} - ${res.bairro}`,
          estado_empresa: res.estado || null,
          cidade_empresa: res.cidade || null
        }
        this.formulario = { ...this.formulario, ...formularioEmpresa }
      }
      this.loading = false
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
        processo: null,
        observacao: null,
        created_at: null,
        created_by: null,
        updated_at: null,
        updated_by: null,
        empresa_id: null,
        cnpj: null,
        status_empresa_id: null,
        nome_fantasia: null,
        razao_social: null,
        data_cadastro: null,
        porte_empresa_id: null,
        empresa_endereco: null,
        estado_empresa: null,
        cidade_empresa: null
      }
      this.setRegistrosEmpresas([])
      this.setRegistrosLicencas([])
      this.listarRegistro()
      this.loading = false
    },
    async resetFormularioLicenca () {
      this.formularioLicenca = {
        id: null,
        licenca: null,
        status_licenca_id: null,
        porte_licenca_id: null,
        tipo_licenca_id: null,
        data_vencimento: null,
        data_saida: null,
        observacao: null,
        created_at: null,
        created_by: null,
        updated_at: null,
        updated_by: null
      }
    },
    resetModalEmpresa () {
      this.modalBuscarEmpresa = false
      this.setRegistrosEmpresas([])
      this.filtroModalEmpresa = {
        id: null,
        cnpj: ' ',
        status: [],
        nomeFantasia: null,
        razaoSocial: null,
        porte: []
      }
    },
    resetFormularioRma () {
      this.formularioRma = {
        id: null,
        status_rma_id: null,
        observacao: null,
        arquivo_submetido: null,
        periodo_inicio: null,
        periodo_fim: null,
        created_at: null,
        created_by: null,
        updated_at: null,
        updated_by: null
      }
    },
    resetModalRma () {
      this.modalRma = false
      this.resetFormularioRma()
      this.controleRma = {
        exibir: false,
        editar: false,
        inserir: false
      }
      this.listarLicencasRegistros()
    },
    resetModalLicenca () {
      this.modalLicenca = false
      this.resetFormularioLicenca()
      this.controleLicenca = {
        exibir: false,
        editar: false,
        inserir: false
      }
      this.listarLicencasRegistros()
      this.setRegistrosRma([])
    },
    resetFormularioAnexo () {
      this.formularioAnexo = {
        value: false,
        titulo: null,
        tabela: null,
        tabelaId: null,
        tipoGrupoId: null,
        subTipoGrupoId: null
      }
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
    },
    limparFiltrosModalEmpresa () {
      this.filtro = {
        id: null,
        cnpj: null,
        status: [],
        nomeFantasia: null,
        razaoSocial: null,
        porte: []
      }
      this.listarRegistro()
    }
  }
}
</script>
