<template>
  <v-dialog
    v-model="value"
    transition="dialog-bottom-transition"
    scrollable
    persistent
    :width="width"
  >
    <v-card>
      <v-toolbar
        color="primary"
        class="font-weight-bold"
        flat
        height="35"
      >
        <v-btn
          color="primary lighten-3"
          icon
          small
          title="Voltar"
          @click="$emit('fechar')"
        >
          <v-icon dark>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-toolbar-title
          class="px-2 white--text subtitle-1"
        >
          {{ titulo }}
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-if="maisOpcoes"
          offset-y
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="white"
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
            v-if="maisOpcoes"
            class="pa-0"
            dense
          >
            <!-- <v-list-item
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
            </v-list-item> -->
            <slot name="maisOpcoes" />
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-card-text class="mt-3 pt-1">
        <slot />
      </v-card-text>
      <v-card-actions class="justify-end">
        <slot name="botoes" />
        <v-btn
          :block="$vuetify.breakpoint.xsOnly"
          :class="$vuetify.breakpoint.xsOnly ? 'my-1' : 'mx-1'"
          color="error"
          small
          @click="$emit('fechar')"
        >
          <v-icon
            left
            size="20"
          >
            mdi-cancel
          </v-icon>
          Voltar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteDateRange',

  props: {
    value: {
      default: false,
      type: Boolean
    },
    titulo: {
      default: 'Modal',
      type: String
    },
    maisOpcoes: {
      default: true,
      type: Boolean
    },
    width: {
      type: [Number, String],
      default: 500
    }
  }
}
</script>
