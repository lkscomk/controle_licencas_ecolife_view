<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="6"
        class="pt-10 d-flex justify-start align-start"
      >
        <v-card
          class="mx-auto"
          width="344"
          height="200"
          outlined
        >
          <v-row class="ma-0 pa-0 d-flex justify-center">
            <v-col
              cols="6"
              class="d-flex justify-center align-center"
            >
              <v-icon
                size="80"
                color="primary"
              >
                mdi-domain
              </v-icon>
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-center align-center"
            >
            <v-row class="pt-5 d-flex justify-center">
              <v-col
                cols="12"
                class="ma-0 pa-0 d-flex justify-start align-start text-h3 font-weight-black"
              >
                84
              </v-col>
              <v-col
                cols="12"
                class="ma-0 pa-0 d-flex justify-start align-start"
              >
                Processos Cadastrados
              </v-col>
            </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        class="pt-10 d-flex justify-start align-start"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                OVERLINE
              </div>
              <v-list-item-title class="text-h5 mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="pt-10 d-flex justify-center align-center red"
      >
        <v-img
          max-width="40%"
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
    dadosProcessosCadastrados: 0
  }),
  async created () {
    await this.buscarDadosProcessosCadastrados()
    await this.buscarDropdownPorteLicencas()
    await this.buscarDropdownStatusLicencas()
    await this.buscarDropdownStatusRma()
    await this.buscarDropdownPortesEmpresa()
    await this.buscarDropdownStatusEmpresa()
    await this.buscarDropdownEstados()
    await this.buscarDropdownStatusProcesso()
  },
  methods: {
    ...mapActions('home', [
      'buscarDadosProcessosCadastradosRegistro'
    ]),
    async buscarDadosProcessosCadastrados () {
      this.loading = true
      const res = await this.buscarDadosProcessosCadastradosRegistro()
      if (res && !res.erro) {
        this.dadosProcessosCadastrados = res
      }
      this.loading = false
    }
  }
}
</script>
