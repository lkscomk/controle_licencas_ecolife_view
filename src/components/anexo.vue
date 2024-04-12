<template>
  <div class="text-center">
    <loading
      :value="loading"
    />
    <aviso
      v-model="aviso.modal"
      :conteudo="aviso.conteudo"
      :acao="aviso.acao"
      @cancelar="aviso = {
        modal: false,
        conteudo: '',
        acao: ''
      }"
      @excluirAnexo="aviso = {
        modal: false,
        conteudo: '',
        acao: ''
      }, excluirRegistroAnexo()"
      @baixarRegistroAnexo="aviso = {
        modal: false,
        conteudo: '',
        acao: ''
      }, baixarRegistroAnexo()"
    />
    <!-- listagem -->
    <v-dialog
      :value="value"
      :content-class="moving ? 'ig-dialog__custon ig-no-transitions' : 'ig-dialog__custon'"
      persistent
      no-click-animation
      width="860"
      transition="dialog-top-transition"
      scrollable
    >
      <v-card>
        <v-card-title
          :class="$vuetify.theme.dark ? 'accent' : 'white back--text'"
          class="title ig-toolbar__custon py-1 px-2"
          dark
        >
          <v-btn
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="mr-2"
            icon
            left
            size="35"
            @click="$emit('fechar'), resetFormulario(), setRegistrosAnexos([])"
          >
            <v-icon class="pa-0 ma-0">
              mdi-close
            </v-icon>
          </v-btn>
          Listagem de Anexos {{ titulo }}
        </v-card-title>

        <v-divider />

        <v-card-text
          class="pa-0 pb-3"
          style="overflow-x: hidden;"
        >
          <v-container
            class="my-0 py-0"
            fluid
          >
            <v-row
              v-if="(registrosAnexos ? registrosAnexos.length : null)"
              class="d-flex grow pa-0"
              dense
            >
              <div
                v-for="(anexo, idx) in registrosAnexos"
                :key="idx"
                class="mx-1 pt-3"
              >
                <v-card
                  :ripple="false"
                  height="200"
                  width="200"
                  outlined
                  @click.prevent="!(controleAnexos.editarPrincipal && formulario.id === anexo.id) ? exibirRegistroAnexo(anexo) : null"
                >
                  <div
                    style="
                  position: relative;
                "
                  >
                    <v-card
                      :color="!!['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => anexo.extensao.toLowerCase().includes(el)) ? '#5e5d5d' : '#48a6f0'"
                      height="200"
                      width="200"
                      dense
                      outlined
                      style="
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                    >
                      <img
                        v-if="!!['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => anexo.extensao.toLowerCase().includes(el))"
                        :src="`${srcAnexoEnv}/api/md093/sistema/anexo/exibir-anexo?checksum=${anexo.checksum}&arquivo=${anexo.arquivo}`"
                        crossorigin="anonymous"
                        style="
                      position: absolute;
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      object-position: center;
                      border-radius: 4px;
                      opacity: 0.15;
                    "
                      >
                      <v-row
                        class="pa-0"
                        dense
                      >
                        <v-col
                          cols="12"
                        >
                          <v-icon
                            class="d-flex align-items-center"
                            color="white"
                            size="70"
                          >
                            {{ anexo.extensao === '.pdf' ? 'mdi-file-pdf-box'
                              : anexo.extensao === '.xlsx' ? 'mdi-file-excel-outline'
                                : anexo.extensao === '.docx' ? 'mdi-file-word-outline'
                                  : !!['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => anexo.extensao.toLowerCase().includes(el)) ? 'mdi-image-outline'
                                    : 'mdi-file' }}
                          </v-icon>
                        </v-col>
                        <v-col
                          class="d-flex justify-center pl-5"
                          cols="12"
                        >
                          <v-text-field
                            v-if="(controleAnexos.editarPrincipal && formulario.id === anexo.id && !controleAnexos.exibir)"
                            v-model="formulario.nome"
                            :error-messages="errorNomeArquivo"
                            :hide-details="errorNomeArquivo ? !errorNomeArquivo.length : true"
                            class="ma-0 pt-4 pr-2 pl-0 pb-0 white--text"
                            label="Nome do Arquivo"
                            autofocus
                            dark
                            dense
                            @blur="(controleAnexos.editarPrincipal = false)"
                            @keydown.enter="formulario.extensao = anexo.extensao, editarRegistroAnexo()"
                            @click.prevent=""
                          />
                          <span
                            v-else
                            class="text-body-1 font-weight-bold white--text"
                            @dblclick.stop="(controleAnexos.editarPrincipal = true, formulario.nome = anexo.nome, formulario.extensao = anexo.extensao, formulario.id = anexo.id )"
                          >
                            {{ anexo.nome }}{{ anexo.extensao }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-card>
                    <div
                      style="
                          position: absolute;
                          display: flex;
                          justify-content: end;
                          right: 0px;
                        "
                    >
                      <v-menu
                        v-if="alterarNome || excluir"
                        offset-y
                        left
                      >
                        <template v-slot:activator="{ on }">
                          <v-tooltip
                            activator="#mo-modal-tooltip"
                            bottom
                          >
                            <span>Mais Opções</span>
                          </v-tooltip>
                          <v-btn
                            color="primary"
                            class="ma-1 pa-2"
                            data-cy="btnMaisOpcoes"
                            small
                            icon
                            v-on="on"
                          >
                            <v-icon color="white">
                              mdi-dots-vertical
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-list
                          class="pa-0"
                          dense
                        >
                          <v-list-item
                            v-if="excluir"
                            @click="aviso = { modal: true, conteudo: 'Deseja excluir esse anexo?', acao: 'excluirAnexo'}, formulario.id = anexo.id"
                          >
                            <v-list-item-icon class="mr-3">
                              <v-icon color="error">
                                mdi-delete
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>
                                Excluir Anexo
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item
                            v-if="alterarNome"
                            @click="(controleAnexos.editarPrincipal = true, formulario.nome = anexo.nome, formulario.id = anexo.id )"
                          >
                            <v-list-item-icon class="mr-3">
                              <v-icon :color="$vuetify.theme.dark ? '' : 'primary'">
                                mdi-pencil
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>
                                Alterar Nome
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-row>
            <v-row
              v-else
              class="pa-0 my-5"
              dense
            >
              <v-col
                cols="12"
                class="d-flex justify-center"
                @click="adicionar ? controleAnexos.inserir = true : null"
              >
                <v-icon
                  left
                  color="primary"
                  size="100"
                  :style="adicionar ? 'cursor: pointer;' : null"
                >
                  mdi-file-cancel-outline
                </v-icon>
              </v-col>
              <v-col
                cols="12"
                class="d-flex justify-center font-weight-black headline"
              >
                Sem Anexos
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions
          class="pa-1"
        >
          <v-spacer />

          <v-btn
            v-if="adicionar"
            class="hard"
            :color="$vuetify.theme.dark ? 'accent' : 'primary'"
            small
            @click="openFilePicker"
          >
            <v-icon
              size="20"
            >
              mdi-plus
            </v-icon>
            Adicionar Anexos
          </v-btn>

          <v-btn
            color="error"
            small
            @click="$emit('fechar'), resetFormulario(), setRegistrosAnexos([])"
          >
            <v-icon
              left
              size="20"
            >
              mdi-cancel
            </v-icon>
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- exibicao -->
    <v-dialog
      v-if="controleAnexos.exibir"
      v-model="controleAnexos.exibir"
      width="1200"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          :class="$vuetify.theme.dark ? 'accent' : 'white back--text'"
          class="title ig-toolbar__custon py-1 px-2"
          dark
        >
          <v-btn
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="mr-2"
            icon
            left
            size="35"
            @click="(controleAnexos.exibir = false), resetFormulario()"
          >
            <v-icon class="pa-0 ma-0">
              mdi-close
            </v-icon>
          </v-btn>
          Exibir Anexo

          <v-spacer />
          <v-menu
            v-if="alterarNome && excluir"
            offset-y
            left
          >
            <template v-slot:activator="{ on }">
              <v-tooltip
                activator="#mo-modal-tooltip"
                bottom
              >
                <span>Mais Opções</span>
              </v-tooltip>
              <v-btn
                id="mo-modal-tooltip"
                :color="$vuetify.theme.dark ? '' : 'primary darken-3'"
                class="mx-0"
                data-cy="btnMaisOpcoes"
                dark
                small
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list
              class="pa-0"
              dense
            >
              <v-list-item
                v-if="excluir"
                @click="aviso = { modal: true, conteudo: 'Deseja excluir esse anexo?', acao: 'excluirAnexo'}"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon color="error">
                    mdi-delete
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Excluir Anexo
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="alterarNome">
                <v-menu
                  v-model="controleAnexos.editar"
                  :close-on-content-click="false"
                  offset-x
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item
                      class="pa-0"
                      dense
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon :color="$vuetify.theme.dark ? '' : 'primary'">
                          mdi-pencil
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          Alterar Nome
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <v-card
                    class="ma-0 pa-0"
                    dense
                  >
                    <v-card-subtitle>
                      <v-text-field
                        v-model="formulario.nome"
                        :error-messages="errorNomeArquivo"
                        :hide-details="errorNomeArquivo ? !errorNomeArquivo.length : true"
                        class="ma-0 pa-0"
                        label="Nome do Arquivo"
                        outlined
                      />
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        text
                        small
                        @click="editarRegistroAnexo()"
                      >
                        Confirmar
                      </v-btn>
                      <v-btn
                        text
                        small
                        @click="controleAnexos.editar = false"
                      >
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-0">
          <div
            v-if="['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => formulario.extensao === el)"
            class="d-flex flex-column justify-space-between align-center"
          >
            <img
              :src="formulario.arquivo"
              style="
                  max-height: 700px;
                  max-width: 1200px;
                  height: auto;
                  width: auto;
                "
            >
          </div>
          <iframe
            v-else
            :src="formulario.arquivo"
            height="1200"
            width="1200"
          />
        </v-card-text>

        <v-divider />
        <v-card-actions
          class="pa-1"
        >
          <v-spacer />

          <v-btn
            v-if="['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => formulario.extensao === el)"
            :color="$vuetify.theme.dark ? 'accent' : 'primary'"
            class="ml-2 mr-2"
            small
            @click="baixarRegistroAnexo(formulario.arquivo, formulario.extensao, formulario.nome)"
          >
            <v-icon
              right
              size="20"
            >
              mdi-download
            </v-icon>
            Baixar Arquivo
          </v-btn>
          <v-btn
            color="error"
            small
            @click="(controleAnexos.exibir = false), resetFormulario()"
          >
            <v-icon
              left
              size="20"
            >
              mdi-cancel
            </v-icon>
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- inserir -->
    <v-dialog
      v-if="controleAnexos.inserir"
      v-model="controleAnexos.inserir"
      width="1200"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          :class="$vuetify.theme.dark ? 'accent' : 'white back--text'"
          class="title ig-toolbar__custon py-1 px-2"
          dark
        >
          <v-btn
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="mr-2"
            icon
            left
            size="35"
            @click="(formulario.arquivo = null, controleAnexos = { inserir: false, exibir: false, editar: false, editarPrincipal: false })"
          >
            <v-icon class="pa-0 ma-0">
              mdi-close
            </v-icon>
          </v-btn>
          Salvar Anexo
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-0">
          <div
            v-if="['.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => formulario.extensao === el)"
            class="d-flex flex-column justify-space-between align-center"
          >
            <img
              :src="formulario.arquivo"
              style="
                  max-height: 700px;
                  max-width: 1200px;
                  height: auto;
                  width: auto;
                "
            >
          </div>
          <iframe
            v-else
            :src="formulario.arquivo"
            height="1200"
            width="1200"
          />
        </v-card-text>

        <v-divider />
        <v-card-actions
          class="pa-1"
        >
          <v-spacer />

          <v-btn
            v-if="['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.bmp'].find(el => formulario.extensao === el)"
            :color="$vuetify.theme.dark ? 'accent' : 'primary'"
            class="ml-2 mr-2"
            small
            @click="salvarRegistroAnexo()"
          >
            <v-icon
              right
              size="20"
            >
              mdi-download
            </v-icon>
            Salvar Arquivo
          </v-btn>
          <v-btn
            color="error"
            small
            @click="(formulario.arquivo = null, controleAnexos = { inserir: false, exibir: false, editar: false, editarPrincipal: false })"
          >
            <v-icon
              left
              size="20"
            >
              mdi-cancel
            </v-icon>
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      accept=""
      @change="handleFileSelect"
    >
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'ComponenteAnexo',
  props: {
    value: {
      required: true,
      type: Boolean
    },
    adicionar: {
      required: false,
      default: true,
      type: Boolean
    },
    excluir: {
      required: false,
      default: true,
      type: Boolean
    },
    alterarNome: {
      required: false,
      default: true,
      type: Boolean
    },
    titulo: {
      default: '',
      type: String
    },
    tabela: {
      default: '',
      type: String
    },
    tabelaId: {
      default: null,
      type: [String, Number]
    },
    tipoGrupoId: {
      default: null,
      type: [String, Number]
    },
    subtipoGrupoId: {
      default: null,
      type: [String, Number]
    }
  },
  data: () => ({
    anexosRegistros: [],
    aviso: {
      modal: false,
      key: null,
      text: ''
    },
    moving: false,
    formulario: {
      id: null,
      typo: null,
      nome: null,
      arquivo: null
    },
    errorNomeArquivo: null,
    modalAnexos: false,

    controleAnexos: {
      exibir: false,
      inserir: false,
      editar: false,
      editarPrincipal: false
    },
    arquivo: null,
    loading: false
  }),
  computed: {
    ...mapState('app', [
      'registrosAnexos'
    ]),
    srcAnexoEnv () {
      return `${process.env.VUE_APP_URL}`
    }
  },
  watch: {
    async value (val) {
      if (val) await this.listarRegistroAnexo()
    }
  },
  methods: {
    ...mapMutations('app', [
      'setRegistrosAnexos'
    ]),
    ...mapActions('app', [
      'salvarAnexo',
      'listarAnexos',
      'exibirAnexo',
      'editarAnexo',
      'excluirAnexo'
    ]),
    // TODO Anexo
    async exibirRegistroAnexo (dados) {
      this.loading = true
      const nome = `${dados.nome}${dados.extensao}`
      const res = await this.exibirAnexo(nome)

      if (res && !res.erro) {
        this.formulario = {
          id: dados.id,
          extensao: dados.extensao ? dados.extensao.toLowerCase() : null,
          nome: dados.nome,
          arquivo: res || null
        }
      }
      const type = this.formulario.extensao === '.pdf' ? 'application/pdf'
        : this.formulario.extensao === '.jpeg' ? 'image/jpeg'
          : this.formulario.extensao === '.jpg' ? 'image/jpg'
            : this.formulario.extensao === '.png' ? 'image/png'
              : this.formulario.extensao === '.bmp' ? 'image/bmp'
                : this.formulario.extensao === '.gif' ? 'image/gif' : null

      if (type) {
        const buffer = Buffer.from(res)
        const blob = new Blob([buffer], { type })
        this.formulario.arquivo = window.URL.createObjectURL(blob)
        this.controleAnexos.exibir = true
      } else {
        this.aviso = {
          modal: true,
          acao: 'baixarRegistroAnexo',
          conteudo: 'Não será possível abrir este aquivo pelo navegador. Deseja baixar o arquivo?'
        }
      }

      this.loading = false
    },
    baixarRegistroAnexo (Arraybuffer, Filetype, fileName) {
      this.loading = true
      let binary = ''
      const bytes = new Uint8Array(Arraybuffer)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      const file = window.btoa(binary)
      const mimType = Filetype === '.pdf' ? 'application/pdf'
        : Filetype === '.xlsx' ? 'application/xlsx'
          : Filetype === '.pptx' ? 'application/pptx'
            : Filetype === '.csv' ? 'application/csv'
              : Filetype === '.docx' ? 'application/docx'
                : Filetype === '.jpg' ? 'application/jpg'
                  : Filetype === '.png' ? 'application/png' : ''
      const url = `data:${mimType};base64,` + file

      const a = document.createElement('a')
      a.href = url
      a.download = fileName + Filetype
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      this.loading = false
    },
    async salvarRegistroAnexo () {
      this.loading = true
      const form = new FormData()
      form.append('tabela', 'licenca')
      form.append('tabela_id', this.tabelaId)
      form.append('tipo_grupo_id', this.tipoGrupoId)
      form.append('subtipo_item_id', this.subtipoGrupoId)
      form.append('file', this.selectedFile)

      const res = await this.salvarAnexo(form)

      if (res && !res.erro) {
        setTimeout(() => {
          this.formulario.arquivo = null
          this.controleAnexos = {
            inserir: false,
            exibir: false,
            editar: false,
            editarPrincipal: false
          }
        }, 500)
        this.listarRegistroAnexo()
      }
      this.loading = false
    },
    async editarRegistroAnexo () {
      this.loading = true
      if (this.formulario.nome) {
        if (this.formulario.nome.length < 100) {
          const res = await this.editarAnexo(
            {
              id: this.formulario.id,
              nome: this.formulario.nome,
              extensao: this.formulario.extensao
            }
          )
          if (res && !res.erro) {
            this.controleAnexos.editar = false
            this.controleAnexos.editarPrincipal = false
            this.listarRegistroAnexo()
          }
        } else {
          this.errorNomeArquivo = 'Valor máximo para Nome do Arquivo é: 100'
        }
      } else {
        this.errorNomeArquivo = 'O campo Nome do Arquivo é Obrigatório'
      }
      this.loading = false
      setTimeout(() => {
        this.errorNomeArquivo = null
      }, 5000)
    },
    async listarRegistroAnexo () {
      this.loading = true
      await this.listarAnexos({
        tabela: this.tabela,
        tabela_id: this.tabelaId,
        tipo_grupo_id: this.tipoGrupoId,
        subtipo_item_id: this.subtipoGrupoId
      })
      this.loading = false
    },
    async excluirRegistroAnexo () {
      this.loading = true

      const res = await this.excluirAnexo(this.formulario.id)

      if (res && !res.erro) {
        this.controleAnexos.exibir = false
        this.resetFormulario()
        this.listarRegistroAnexo()
      }

      this.loading = false
    },

    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleFileSelect (event) {
      this.selectedFile = event.target.files[0]
      if (`${this.selectedFile.name.split('.').pop()}`.toLowerCase() !== '.PDF') {
        this.$notificacao('O sistema só suporta arquivos PDF, outros tipos estão em desenvolvimento.', 'erro')
        this.selectedFile = null
        return
      }
      if (this.selectedFile && (this.selectedFile.size <= 5 * 1024 * 1024)) {
        const reader = new FileReader()
        reader.onload = () => {
          this.formulario = {
            id: null,
            extensao: this.selectedFile.name ? `.${this.selectedFile.name.split('.').pop()}`.toLowerCase() : null,
            nome: this.selectedFile.name,
            arquivo: reader.result
          }
          this.controleAnexos.inserir = true
        }
        reader.readAsDataURL(this.selectedFile)
      } else {
        this.$notificacao('Por favor, selecione um arquivo de até 5MB.', 'error')
        this.selectedFile = null
        event.target.files[0] = null
      }
    },
    resetFormulario () {
      this.formulario = {
        id: null,
        extensao: null,
        nome: null,
        arquivo: null
      }
    }
  }
}
</script>

  <style>
    .ig-dialog__custon {
      position: absolute;
      margin: 0;
    }
    .ig-dialog__moving {
      cursor: move !important;
      user-select: none !important;
    }
    .ig-no-transitions {
      transition: none !important;
    }
    .v-card--reveal {
      align-items: center;
      bottom: 0;
      display: flex !important;
      justify-content: center;
      opacity: 0.9;
      position: absolute;
      width: 100%;
    }
  </style>
