<template>
  <v-row justify="center">
    <v-dialog
      v-model="value"
      persistent
      max-width="600"
    >
      <v-card>
        <v-toolbar
          color="primary"
          class="elevation-0"
          height="50px"
          dark
        >
        <div class="text-h6 font-weight-bold">{{ titulo }}</div>
        </v-toolbar>
        <v-card-text class="py-5">{{ conteudo }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            small
            @click="$emit('cancelar')"
          >
            <v-icon
              left
              size="20"
            >
              mdi-cancel
            </v-icon>
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            small
            @click="$emit(`${acao}`)"
          >
            <v-icon
              left
              size="20"
            >
              mdi-check
            </v-icon>
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    },
    titulo: {
      type: String,
      default: 'Aviso'
    },
    conteudo: {
      type: String,
      default: 'Você deseja realmente continuar essa ação?'
    },
    acao: {
      type: String,
      default: 'acao'
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
