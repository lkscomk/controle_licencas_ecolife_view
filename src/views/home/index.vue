<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="12"
        class="ma-0 pa-0 grey lighten-4"
        style="color: grey;"
      >
        <v-row class="ma-0 pa-0 d-flex justify-center">
          <v-col
            cols="12"
            class="pt-10 pl-10 d-flex justify-start align-start text-h4 font-weight-black"
            style="color: grey;"
          >
            Processos
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: gray;"
                >
                  {{ dados.cadastrado }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Cadastrados
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #FCBF6B;"
                >
                  {{ dados.digitacao }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Em Digitação
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #0B8770;"
                >
                  {{ dados.ativo }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Ativos
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #D32F2F;"
                >
                  {{ dados.desativado }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Desativados
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #8B0000;"
                >
                  {{ dados.arquivo_morto }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Arquivo Morto
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="ma-0 pa-0 grey lighten-4"
        style="color: grey;"
      >
        <v-row class="ma-0 pa-0 d-flex justify-center">
          <v-col
            cols="12"
            class="pt-10 pl-10 d-flex justify-start align-start text-h4 font-weight-black"
            style="color: grey;"
          >
            Licenças
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: gray;"
                >
                  {{ dadosLicencas.cadastrado }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Cadastrados
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #FCBF6B;"
                >
                  {{ dadosLicencas.digitacao }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Em Digitação
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #0B8770;"
                >
                  {{ dadosLicencas.ativo }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Ativos
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col
            xl="2"
            lg="2"
            md="4"
            sm="4"
            cols="12"
          >
            <v-card
              height="270"
              outlined
              class="d-flex justify-center align-center"
            >
              <v-row
                dense
                class="hover-card"
              >
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h2 font-weight-black"
                  style="color: #D32F2F;"
                >
                  {{ dadosLicencas.vencido }}
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex justify-center align-center text-h5"
                >
                  Vencidos
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="pt-10 d-flex justify-center align-center"
      >
        <v-img
          max-width="10%"
          :src="require('@/assets/logoEcolife.png')"
          class="my-3"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    loading: false,
    dados: {
      cadastrado: 0,
      ativo: 0,
      desativado: 0,
      arquivo_morto: 0,
      digitacao: 0
    },
    dadosLicencas: {
      cadastrado: 0,
      ativo: 0,
      vencido: 0,
      digitacao: 0
    }
  }),
  async created () {
    await this.buscarDadosProcessos()
    await this.buscarDadosLicencas()
  },
  methods: {
    ...mapActions('home', [
      'buscarDadosProcessosRegistro',
      'buscarDadosLicencasRegistro'
    ]),
    async buscarDadosProcessos () {
      this.loading = true
      const res = await this.buscarDadosProcessosRegistro()
      if (res && !res.erro) {
        this.animarCrescimentoProcessos(res[0])
      }
      this.loading = false
    },
    animarCrescimentoProcessos (res) {
      const incrementoCadastrado = Math.ceil(res.cadastrado / 100)

      const intervaloAnimacaoCadastrado = setInterval(() => {
        if (this.dados.cadastrado < res.cadastrado) {
          this.dados.cadastrado += incrementoCadastrado
        } else {
          this.dados.cadastrado = res.cadastrado
          clearInterval(intervaloAnimacaoCadastrado)
        }
      }, 20)

      const incrementoAtivo = Math.ceil(res.ativo / 100)
      const intervaloAnimacaoAtivo = setInterval(() => {
        if (this.dados.ativo < res.ativo) {
          this.dados.ativo += incrementoAtivo
        } else {
          this.dados.ativo = res.ativo
          clearInterval(intervaloAnimacaoAtivo)
        }
      }, 20)

      const incrementoArquivoMorto = Math.ceil(res.arquivo_morto / 100)
      const intervaloAnimacaoArquivoMorto = setInterval(() => {
        if (this.dados.arquivo_morto < res.arquivo_morto) {
          this.dados.arquivo_morto += incrementoArquivoMorto
        } else {
          this.dados.arquivo_morto = res.arquivo_morto
          clearInterval(intervaloAnimacaoArquivoMorto)
        }
      }, 20)

      const incrementoDigitacao = Math.ceil(res.digitacao / 100)
      const intervaloAnimacaoDigitacao = setInterval(() => {
        if (this.dados.digitacao < res.digitacao) {
          this.dados.digitacao += incrementoDigitacao
        } else {
          this.dados.digitacao = res.digitacao
          clearInterval(intervaloAnimacaoDigitacao)
        }
      }, 20)

      const incrementoDesativado = Math.ceil(res.desativado / 100)
      const intervaloAnimacaoDesativado = setInterval(() => {
        if (this.dados.desativado < res.desativado) {
          this.dados.desativado += incrementoDesativado
        } else {
          this.dados.desativado = res.desativado
          clearInterval(intervaloAnimacaoDesativado)
        }
      }, 20)
    },
    async buscarDadosLicencas () {
      this.loading = true
      const res = await this.buscarDadosLicencasRegistro()
      if (res && !res.erro) {
        this.animarCrescimentoLicencas(res[0])
      }
      this.loading = false
    },
    animarCrescimentoLicencas (res) {
      const incrementoCadastrado = Math.ceil(res.cadastrado / 100)

      const intervaloAnimacaoCadastradoLicencas = setInterval(() => {
        if (this.dadosLicencas.cadastrado < res.cadastrado) {
          this.dadosLicencas.cadastrado += incrementoCadastrado
        } else {
          this.dadosLicencas.cadastrado = res.cadastrado
          clearInterval(intervaloAnimacaoCadastradoLicencas)
        }
      }, 20)

      const incrementoAtivo = Math.ceil(res.ativo / 100)
      const intervaloAnimacaoAtivoLicenca = setInterval(() => {
        if (this.dadosLicencas.ativo < res.ativo) {
          this.dadosLicencas.ativo += incrementoAtivo
        } else {
          this.dadosLicencas.ativo = res.ativo
          clearInterval(intervaloAnimacaoAtivoLicenca)
        }
      }, 20)

      const incrementoDigitacao = Math.ceil(res.digitacao / 100)
      const intervaloAnimacaoDigitacaoLicenca = setInterval(() => {
        if (this.dadosLicencas.digitacao < res.digitacao) {
          this.dadosLicencas.digitacao += incrementoDigitacao
        } else {
          this.dadosLicencas.digitacao = res.digitacao
          clearInterval(intervaloAnimacaoDigitacaoLicenca)
        }
      }, 20)

      const incrementoVencido = Math.ceil(res.vencido / 100)
      const intervaloAnimacaoVencidoLicenca = setInterval(() => {
        if (this.dadosLicencas.vencido < res.vencido) {
          this.dadosLicencas.vencido += incrementoVencido
        } else {
          this.dadosLicencas.vencido = res.vencido
          clearInterval(intervaloAnimacaoVencidoLicenca)
        }
      }, 20)
    }
  }
}
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease-in-out;
}

.hover-card:hover {
  transform: scale(1.25); /* Aumenta levemente o tamanho do card */
}
</style>
