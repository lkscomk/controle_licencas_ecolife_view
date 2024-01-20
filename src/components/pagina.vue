<template>
  <div>
    <loading :value="loading" />
    <v-row
      dense
    >
      <v-col
        :cols="12"
      >
        <v-container
          v-if="titulo || subtitulo"
          class="py-0 px-3 pl-5 elevation-1 d-flex align-center grey lighten-4"
          style="height: 60px;"
          fluid
        >
          <div class="headline font-weight-regular">
            <b v-if="titulo">{{ titulo }}</b> {{ titulo && subtitulo ? '|' : '' }}
            <span
              v-if="subtitulo"
              class="body-1 font-weight-mediun"
            >
              {{ subtitulo }}
            </span>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-row
      :class="$vuetify.breakpoint.mobile ? 'ma-0' : 'justify-center'"
      dense
    >
      <v-col
        cols="12"
        class="pb-0 mb-0"
      >
        <slot />
      </v-col>
      <v-col
        v-if="!modal"
        cols="12"
        class="pb-0 mb-0"
      >
        <slot name="listagem" />
      </v-col>
      <v-col
        v-else
        cols="12"
      >
        <v-card
          class="elevation-0 ma-2"
          outlined
        >
          <v-toolbar
            :class="$vuetify.theme.dark ? '' : 'grey--text text--darken-2'"
            :color="$vuetify.theme.dark ? 'accent' : 'white'"
            class="font-weight-bold"
            flat
            height="50"
          >
            <v-btn
              color="error"
              icon
              small
              title="Voltar"
              @click="$emit('voltar')"
            >
              <v-icon dark>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-toolbar-title class="px-2">
              {{ tituloFormulario }}
            </v-toolbar-title>
            <v-spacer />
            <v-menu
              v-if="maisOpcoes"
              offset-y
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary darken-1"
                  class="mx-0"
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
                v-if="maisOpcoes && maisOpcoes.length"
                class="pa-0"
                dense
              >
                <v-list-item
                  v-for="(opcao, i) in maisOpcoes"
                  :key="i"
                  :disabled="!!opcao.disabled"
                  @click="opcao.acao ? $emit(opcao.acao) : $emit('input')"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon :color="opcao.color || 'primary'">
                      {{ opcao.icone }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ opcao.titulo }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <slot name="maisOpcoes" />
            </v-menu>
          </v-toolbar>
          <v-card-text class="ma-0 pa-0">
            <slot name="formulario" />
          </v-card-text>
          <v-card-actions>
            <v-row
              class="pa-0"
              dense
            >
              <v-col
                v-if="camposObrigatorios"
                :class="$vuetify.breakpoint.xsOnly ? 'px-0 py-0 text-center' : 'px-0 py-0'"
                cols="12"
                xl="3"
                lg="3"
                md="3"
                sm="12"
              >
                <span class="caption pl-2">
                  <span class="red--text">*</span> Campos obrigatórios
                </span>
              </v-col>
              <v-spacer />
              <v-col
                cols="12"
                class="text-right py-1"
                xl="9"
                lg="9"
                md="9"
                sm="12"
              >
                <slot name="botoes" />
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
      >
        <slot name="relacionamento" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loading from './loading.vue'
export default {
  name: 'ComponentePagina',

  components: {
    loading
  },

  props: {
    subtitulo: {
      default: '',
      type: String
    },
    titulo: {
      default: '',
      type: String
    },
    tituloFormulario: {
      default: '',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    },
    modal: {
      default: false,
      type: Boolean
    },
    camposObrigatorios: {
      default: true,
      type: Boolean
    },
    maisOpcoes: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    aviso: {
      modal: false,
      key: null,
      text: ''
    }
  })
}
</script>
