<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <loading :value="loading" />
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <v-img
          v-if="$vuetify.breakpoint.name === 'xl'"
          src="@/assets/logoEcolife.png"
          max-width="400px"
          contain
        />
        <v-img
          v-else-if="$vuetify.breakpoint.name === 'lg'"
          src="@/assets/logoEcolife.png"
          max-width="350px"
          contain
        />
        <v-img
          v-else-if="$vuetify.breakpoint.name === 'md'"
          src="@/assets/logoEcolife.png"
          max-width="300px"
          contain
        />
        <v-img
          v-else-if="$vuetify.breakpoint.name === 'sm'"
          src="@/assets/logoEcolife.png"
          max-width="250px"
          contain
        />
        <v-img
          v-else
          src="@/assets/logoEcolife.png"
          max-width="200px"
          contain
        />
      </v-col>
      <v-col
        xl="4"
        lg="4"
        md="5"
        sm="10"
        cols="12"
        class="d-flex justify-center"
      >
        <v-card
          flat
          width="1200"
        >
          <v-card-title class="d-flex justify-center pa-0">
            Login
          </v-card-title>
          <v-card-text>
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
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          label="Email"
                          outlined
                        />
                      </validation-provider>
                    </v-col>
                    <v-col
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
                          :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          label="Senha"
                          outlined
                          :type="mostrarSenha ? 'text' : 'password'"
                          @click:append="mostrarSenha = !mostrarSenha"
                          @keypress.enter="fazerLogin()"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-btn
                        text
                        small
                      >
                        Esqueceu a senha?
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-btn
                        color="primary"
                        block
                        class="rounded-button"
                        @click="fazerLogin()"
                      >
                        ENTRAR
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="text-center mt-3">
                        Ainda não tem conta? Entre em contato com o RH
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.rounded-button {
  border-radius: 25px;
  font-size: 14px;
}
.bold-label {
  font-weight: bold;
}
</style>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeLogin',
  data: () => ({
    mostrarSenha: false,
    loading: false,
    formulario: {
      email: null,
      senha: null
    }
  }),
  computed: {
    ...mapState('app', [
    ])
  },
  methods: {
    ...mapActions('app', [
      'login',
      'buscarAcessos'
    ]),
    async fazerLogin () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const res = await this.login({
          email: this.formulario.email || undefined,
          senha: this.formulario.senha ? this.$crypto(this.formulario.senha, 'sha256') : undefined
        })
        if (res && !res.erro) {
          await this.buscarAcessos(res.id)
          this.abrirJenela('/')
          setTimeout(() => {
            if (this.$crypto(this.formulario.senha, 'sha256') === 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f') {
              this.abrirJenela('/perfil?alterarSenha=true')
              this.$notificacao('Por favor, altere sua senha imediatamente!', 'erro')
            }
          }, '3000')
        }
        this.loading = false
      }
    },
    abrirJenela (tela) {
      if (tela !== this.$router.currentRoute.path) {
        const route = this.$router.resolve({ path: tela })

        if (tela) {
          this.$router.push(route.href)
        }
      } else {
        window.location.reload(true)
      }
    }
  }
}
</script>
