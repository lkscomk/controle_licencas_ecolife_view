<template>
  <pagina
    :loading="loading"
    :modal="modal"
    titulo="Informações de Perfil"
    subtitulo="Cadastro e Manutenção"
  >
    <template slot="listagem">
      <validation-observer ref="observer">
        <v-container
          fluid
          grid-list-xs
        >
          <v-row
            class="d-flex justify-center"
            dense
          >
            <v-col
              class="d-flex justify-center align-center flex-column"
              xl="8"
              lg="9"
              md="10"
              sm="12"
              cols="12"
            >
              <v-avatar
                size="300"
                class="elevation-1 my-3"
              >
                <v-img
                  v-if="imagemPerfil"
                  :src="imagemPerfil"
                  alt="Profile Image"
                />
                <v-icon
                  v-else
                  size="150"
                  @click="controle.editar ? openFilePicker() : null"
                >
                  mdi-account
                </v-icon>
              </v-avatar>

              <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="handleFileSelect"
              >
            </v-col>
            <v-col
              class="d-flex justify-end align-end flex-column"
              xl="6"
              lg="6"
              md="6"
              sm="6"
              cols="12"
            >
              <v-btn
                color="success"
                small
                @click="openFilePicker"
              >
                {{ imagemPerfil ? 'Substituir Imagem' : 'Escolher Imagem' }}
              </v-btn>
            </v-col>
            <v-col
              class="d-flex justify-start align-start flex-column"
              xl="6"
              lg="6"
              md="6"
              sm="6"
              cols="12"
            >
              <v-btn
                :disabled="!imagemPerfil || !imagemMudando || loading "
                color="success"
                small
                @click="imagemMudando && imagemPerfil ? salvarImagem() : $notificacao('Não teve alteração da imagem para ser salva.', 'erro')"
              >
                {{ 'Salvar Imagem' }}
              </v-btn>
            </v-col>
            <v-col
              xl="8"
              lg="9"
              md="10"
              sm="12"
              cols="12"
            >
              <v-row dense>
                <v-col
                  xl="2"
                  lg="2"
                  md="2"
                  sm="12"
                  cols="12"
                >
                  <v-text-field
                    v-model="formulario.login"
                    hide-details
                    disabled
                    dense
                    label="Login"
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nome"
                    vid="nome"
                    rules="required"
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
                  md="3"
                  sm="12"
                  cols="12"
                >
                  <v-text-field
                    v-model="formulario.email"
                    hide-details
                    disabled
                    dense
                    label="Email"
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
                      label="Data Nascimento"
                      class="required"
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
                    name="CPF"
                    vid="cpf"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formulario.cpf"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controle.exibir"
                      dense
                      label="CPF"
                      class="required"
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
                  <v-autocomplete
                    v-model="formulario.tipo_usuario_id"
                    :items="dropdownTipoUsuario"
                    hide-details
                    disabled
                    dense
                    item-value="item"
                    item-text="descricao"
                    label="Tipo de Usuário"
                    class="required"
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
                  <v-text-field
                    v-model="formulario.criadoEm"
                    hide-details
                    label="Usuário desde"
                    disabled
                    dense
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-end"
                >
                  <v-btn
                    v-if="!!(controle.exibir && !controle.inserir)"
                    color="success"
                    small
                    class="mx-1"
                    @click="modalAlterarSenha = true, controleSenha.inserir = true"
                  >
                    Alterar Senha
                  </v-btn>
                  <v-btn
                    v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                    color="success"
                    small
                    class="mx-1"
                    @click="salvarPerfilUsuario()"
                  >
                    Salvar
                  </v-btn>
                  <v-btn
                    v-if="!!(controle.exibir && !controle.inserir)"
                    color="success"
                    small
                    class="mx-1"
                    @click="controle.editar = true, controle.exibir = false"
                  >
                    Editar
                  </v-btn>
                  <v-btn
                    v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                    color="error"
                    class="mx-1"
                    small
                    @click="buscarPerfilUsuario()"
                  >
                    CANCELAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </validation-observer>
    </template>

    <modal
      v-model="modalAlterarSenha"
      width="40%"
      :titulo="'Alterar Senha'"
      :mais-opcoes="false"
      @fechar="resetModalAlterarSenha()"
    >
      <template slot="botoes">
        <v-btn
          v-if="!!(!controleSenha.exibir && (controleSenha.inserir || controleSenha.editar))"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="salvarPerfilUsuarioSenha()"
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
          v-if="!!(controleSenha.exibir && !controleSenha.inserir)"
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="success"
          small
          @click="controleSenha.editar = true, controleSenha.exibir = false"
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
          <validation-observer ref="observerAlterarSenha">
            <v-container
              class="ma-0 pa-0"
              fluid
            >
              <v-row dense>
                <v-col
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Antiga Senha"
                    vid="antigaSenha"
                    rules="required|min:8"
                  >
                    <v-text-field
                      v-model="formularioSenha.antigaSenha"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :append-icon="mostrarAntigaSenha ? 'mdi-eye' : 'mdi-eye-off'"
                      dense
                      label="Antiga Senha"
                      class="required"
                      outlined
                      :type="!mostrarAntigaSenha ? 'password' : 'text'"
                      @click:append="mostrarAntigaSenha = !mostrarAntigaSenha"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Senha Nova"
                    vid="senhaNova"
                    rules="required|min:8"
                  >
                    <v-text-field
                      v-model="formularioSenha.senhaNova"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :append-icon="mostrarSenhaNova ? 'mdi-eye' : 'mdi-eye-off'"
                      dense
                      label="Nova Senha"
                      outlined
                      class="required"
                      :type="!mostrarSenhaNova ? 'password' : 'text'"
                      @click:append="mostrarSenhaNova = !mostrarSenhaNova"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  xl="12"
                  lg="12"
                  md="12"
                  sm="12"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Senha Nova Confirmação"
                    vid="senhaNovaConfirmacao"
                    rules="required|min:8"
                  >
                    <v-text-field
                      v-model="formularioSenha.senhaNovaConfirmacao"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :append-icon="mostrarSenhaNovaConfirmacao ? 'mdi-eye' : 'mdi-eye-off'"
                      dense
                      label="Nova Senha Confirmação"
                      outlined
                      class="required"
                      :type="!mostrarSenhaNovaConfirmacao ? 'password' : 'text'"
                      @click:append="mostrarSenhaNovaConfirmacao = !mostrarSenhaNovaConfirmacao"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
            </v-container>
          </validation-observer>
        </v-form>
      </template>
    </modal>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Perfil',
  data: () => ({
    modal: false,
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    mostrarSenhaNovaConfirmacao: false,
    mostrarSenhaNova: false,
    mostrarAntigaSenha: false,
    modalAlterarSenha: false,
    imagemMudando: false,
    formulario: {
      id: null,
      login: null,
      nome: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      criadoEm: null,
      tipo_usuario_id: null
    },
    formularioSenha: {
      antigaSenha: null,
      senhaNova: null,
      senhaNovaConfirmacao: null
    },
    controleImagem: {
      exibir: true,
      editar: false,
      inserir: false
    },
    controle: {
      exibir: true,
      editar: false,
      inserir: false
    },
    controleSenha: {
      exibir: false,
      editar: false,
      inserir: false
    },
    imagemPerfil: null,
    selectedFile: null
  }),
  computed: {
    ...mapState('perfil', [
      'dropdownTipoUsuario'
    ])
  },
  async created () {
    this.buscarPerfilUsuario()
    await this.buscarDropdownTipoUsuario()
  },
  methods: {
    ...mapActions('perfil', [
      'buscarUsuario',
      'buscarImagemUsuario',
      'salvarUsuario',
      'salvarImagemUsuario',
      'buscarDropdownTipoUsuario',
      'editarSenhaUsuario',
      'exibirAnexo'
    ]),
    ...mapActions('app', [
      'buscarPathImagem'
    ]),
    async buscarPerfilUsuario () {
      this.loading = true
      const res = await this.buscarUsuario(this.perfil)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          login: window.atob(localStorage.getItem('umbrella:login')),
          nome: res.nome || null,
          senha: null,
          email: res.email || null,
          dataNascimento: res.data_nascimento ? this.$day(res.data_nascimento).format('DD/MM/YYYY') : null,
          criadoEm: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          tipo_usuario_id: res.tipo_usuario_id || null,
          cpf: res.cpf || null
        }
        this.controle = {
          exibir: true,
          editar: false,
          inserir: false
        }
        this.buscarImagem()
      }
      this.loading = false
    },
    async salvarPerfilUsuario () {
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
        const res = await this.salvarUsuario({
          id: this.formulario.id || null,
          email: this.formulario.email || null,
          nome: this.formulario.nome || null,
          cpf: this.formulario.cpf ? String(this.formulario.cpf).match(/\d/g).join('') : undefined,
          data_nascimento: this.formulario.dataNascimento ? this.$day(this.formulario.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          tipo_usuario_id: this.formulario.tipo_usuario_id || null
        })
        if (res && !res.erro) {
          this.buscarPerfilUsuario()
        }
        this.loading = false
      }
    },
    async salvarPerfilUsuarioSenha () {
      if (await this.$refs.observerAlterarSenha.validate()) {
        this.loading = true
        if (this.formularioSenha.senhaNova !== this.formularioSenha.senhaNovaConfirmacao) {
          this.$refs.observerAlterarSenha.setErrors({ senhaNova: ['As senhas não estão iguais'] })
          this.$refs.observerAlterarSenha.setErrors({ senhaNovaConfirmacao: ['As senhas não estão iguais'] })
          this.loading = false
          return
        }
        const res = await this.editarSenhaUsuario({
          id: this.formulario.id || null,
          antiga_senha: this.formularioSenha.antigaSenha ? this.$crypto(this.formularioSenha.antigaSenha, 'sha256') : undefined,
          senha_nova: this.formularioSenha.senhaNova ? this.$crypto(this.formularioSenha.senhaNova, 'sha256') : undefined
        })
        if (res && !res.erro) {
          this.resetModalAlterarSenha()
          this.buscarPerfilUsuario()
        }
        this.loading = false
      }
    },
    async buscarImagem () {
      this.loading = true
      const dados = await this.buscarPathImagem(this.formulario.id)
      const nome = `${dados.nome}${dados.extensao}`
      const res = await this.exibirAnexo(nome)

      if (res && !res.erro) {
        const type = dados.extensao === '.pdf' ? 'application/pdf'
          : dados.extensao === '.jpeg' ? 'image/jpeg'
            : dados.extensao === '.jpg' ? 'image/jpg'
              : dados.extensao === '.png' ? 'image/png'
                : dados.extensao === '.bmp' ? 'image/bmp'
                  : dados.extensao === '.gif' ? 'image/gif' : null

        if (type) {
          const buffer = Buffer.from(res)
          const blob = new Blob([buffer], { type })
          this.imagemPerfil = URL.createObjectURL(blob)
        } else {
          this.aviso = {
            modal: true,
            key: 'baixarRegistroAnexo',
            text: 'Não será possível abrir este aquivo pelo navegador. Deseja baixar o arquivo?'
          }
        }
      }

      this.loading = false
    },
    async salvarImagem () {
      this.loading = true
      const form = new FormData()
      form.append('tabela', 'usuario')
      form.append('tabela_id', this.formulario.id)
      form.append('tipo_grupo_id', 8) // GRUPO 8 - ITEM 4 - IMGAGENS DOS USUARIOS
      form.append('subtipo_item_id', 4) // GRUPO 8 - ITEM 4 - IMGAGENS DOS USUARIOS
      form.append('file', this.selectedFile)

      await this.salvarImagemUsuario(form)
      this.imagemMudando = false
      this.loading = false
    },
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleFileSelect (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagemMudando = true
          this.imagemPerfil = reader.result
        }
        reader.readAsDataURL(this.selectedFile)
      }
    },
    resetModalAlterarSenha () {
      this.modalAlterarSenha = false
      this.mostrarSenhaNova = false
      this.mostrarAntigaSenha = false
      this.modalAlterarSenha = false
      this.formularioSenha = {
        antigaSenha: null,
        senhaNova: null,
        senhaNovaConfirmacao: null
      }
      this.controleSenha = {
        exibir: false,
        editar: false,
        inserir: false
      }
    }
  }
}
</script>
