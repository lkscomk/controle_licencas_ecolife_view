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
              <!-- <v-btn
                v-if="controle.editar"
                color="success"
                small
                @click="openFilePicker"
              >
                {{ imagemPerfil ? 'Substituir Imagem' : 'Escolher Imagem' }}
              </v-btn> -->
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="handleFileSelect"
              >
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
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controle.exibir"
                      dense
                      label="Nome*"
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
                      label="Data Nascimento*"
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
                      v-mask="'###.###.###-##'"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controle.exibir"
                      dense
                      label="CPF*"
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
                    v-model="formulario.tipoUsuarioId"
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Senha"
                    vid="senha"
                    rules="required|min:8"
                  >
                    <v-text-field
                      v-model="formulario.senha"
                      :error-messages="errors"
                      :hide-details="!errors.length"
                      :disabled="controle.exibir"
                      :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                      dense
                      label="Nova Senha*"
                      outlined
                      :type="!mostrarSenha ? 'password' : 'text'"
                      @click:append="mostrarSenha = !mostrarSenha"
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
                    v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                    color="success"
                    class="mx-1"
                    @click="salvarPerfilUsuario()"
                  >
                    Salvar
                  </v-btn>
                  <v-btn
                    v-if="!!(controle.exibir && !controle.inserir)"
                    color="success"
                    class="mx-1"
                    @click="controle.editar = true, controle.exibir = false"
                  >
                    Editar
                  </v-btn>
                  <v-btn
                    v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                    color="error"
                    class="mx-1"
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
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/plugins/axios_local'

export default {
  name: 'Perfil',
  data: () => ({
    modal: false,
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    mostrarSenha: false,
    formulario: {
      id: null,
      login: null,
      nome: null,
      senha: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      criadoEm: null,
      tipoUsuarioId: null
    },
    controle: {
      exibir: true,
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
      'buscarDropdownTipoUsuario'
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
          tipoUsuarioId: res.tipo_usuario_id || null,
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
          cpf: this.formulario.cpf || null,
          senha: this.formulario.senha ? this.$crypto(this.formulario.senha, 'sha256') : undefined,
          data_nascimento: this.formulario.dataNascimento ? this.$day(this.formulario.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
          tipoUsuarioId: this.formulario.tipoUsuarioId || null
        })
        if (res && !res.erro) {
          if (this.imagemPerfil) await this.salvarImagem()
          this.mostrarSenha = false
          this.buscarPerfilUsuario()
        }
        this.loading = false
      }
    },
    async buscarImagem () {
      this.loading = true
      const res = await this.buscarPathImagem(this.formulario.id)
      let foto = null
      if (res && !res.erro && res.checksum) {
        await axios
          .get(`https://servidor-arquivos-umbrella.lukasrocha.repl.co/download${res.checksum}`, {
            responseType: 'arraybuffer'
          })
          .then(function (response) {
            foto = response.data
          })
          .catch(function (error) {
            window.console.log(error)
          })
        const buffer = Buffer.from(foto, 'binary')
        const blob = new Blob([buffer], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        this.imagemPerfil = imageUrl
      }
      this.loading = false
    },
    async salvarImagem () {
      const form = new FormData()
      form.append('tabela', 'usuario')
      form.append('tabela_id', this.formulario.id)
      form.append('file', this.selectedFile)

      await this.salvarImagemUsuario(form)
    },
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleFileSelect (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagemPerfil = reader.result
        }
        reader.readAsDataURL(this.selectedFile)
      }
    }
  }
}
</script>
