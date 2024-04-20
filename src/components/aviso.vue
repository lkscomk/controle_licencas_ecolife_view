<template>
  <v-dialog
    v-if="value"
    :width="options.width || 550"
    :value="value"
    persistent
  >
    <v-card>
      <!-- Component icon and title -->
      <v-card-title class="pa-3">
        <v-icon
          :color="options.color || 'warning'"
          class="display-1 mr-2 ml-1"
          left
        >
          {{ options.icon || 'mdi-alert-circle-outline' }}
        </v-icon>

        <span class="title">
          {{ options.title || 'Atenção!' }}
        </span>
      </v-card-title>

      <v-divider class="divider-app" />

      <v-card-text
        v-if="options.header"
        class="py-2"
      >
        <div class="body-1 ml-0 font-weight-bold">
          <slot name="header">
            {{ options.header }}
          </slot>
        </div>
      </v-card-text>

      <v-divider
        v-if="options.text && options.header"
        class="mb-5"
      />

      <!-- Component content -->
      <v-card-text :class="!options.header ? 'mt-5' : ''">
        <!-- Slot content default -->
        <slot>
          <div
            v-if="options.text && typeof options.text === 'string'"
            :class="$vuetify.theme.dark ? 'subheading' : 'subheading black--text'"
            v-html="options.text"
          >
            {{ options.text }}
          </div>

          <div
            v-if="options.text && typeof options.text === 'object'"
            :class="$vuetify.theme.dark ? 'subheading' : 'subheading black--text'"
          >
            <v-list class="pa-0">
              <v-list-item
                v-for="(valor, indice) in options.text"
                :key="indice"
                class="pa-0"
              >
                <v-list-item-action>
                  <v-icon :color="valor.color ? valor.color : 'green'">
                    {{ valor.icon || 'mdi-check-outline' }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content class="flex-wrap">
                  <v-list-item-title
                    class="d-flex flex-wrap"
                    v-html="valor.text ? valor.text : valor"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>

          <div
            v-if="options.table && typeof options.table === 'object' && options.table.headers && options.table.itens"
            :class="$vuetify.theme.dark ? 'subheading' : 'subheading black--text'"
          >
            <v-data-table
              :headers="options.table.headers"
              :items="options.table.itens"
              dense
              disable-pagination
              hide-default-footer
            >
              <template v-slot:[`item.icone`]="{ value }">
                <v-icon
                  :color="$vuetify.theme.dark && value.color === 'primary' ? 'white' : (value.color || 'primary')"
                  size="25"
                >
                  {{ value.icon || 'mdi-check-outline' }}
                </v-icon>
              </template>
            </v-data-table>
          </div>
        </slot>
      </v-card-text>

      <v-divider v-if="options.footer || options.actions && options.actions.length || actiosDefault.length" />

      <!-- Component actions -->
      <v-card-actions class="my-0 py-0 px-0 flex-wrap justify-end">
        <!-- Slot actions -->
        <slot name="actions" />
        <v-checkbox
          v-if="options && options.footerCheckAccept"
          v-model="confirmacaoAviso"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :ripple="false"
          class="my-1 mx-1"
          label="Estou ciente e desejo continuar"
          hide-details
        />

        <span
          v-if="options.footer"
          class="'font-weight-bold subheading text-xs-center pt-1 pl-2 ml-3'"
        >
          <b>{{ options.footer }}</b>
        </span>
        <v-spacer />
        <v-btn
          v-for="(action, idx) in options.actions && options.actions.length ? options.actions : actiosDefault"
          :key="idx"
          :color="$vuetify.theme.dark && action.color !== 'error' ? 'accent' : action.color || 'primary'"
          :data-cy="action.dataCy"
          :disabled="action.disabled"
          class="my-1 mx-1"
          small
          @click="action.emit !== 'input' ? $emit(`${ options.key }`, options.event) : 'input', $emit(`${ action.emit }`)"
        >
          <v-icon left>
            {{ action.icon }}
          </v-icon>
          {{ action.title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WarningComponent',

  props: {
    value: {
      default: false,
      type: Boolean
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    confirmacaoAviso: false
  }),

  computed: {
    actiosDefault () {
      return [
        {
          color: 'primary',
          disabled: this.options && this.options.footerCheckAccept && !this.confirmacaoAviso,
          dataCy: 'btnConfirmar',
          emit: 'sim',
          icon: 'mdi-check-circle-outline',
          title: 'Confirmar'
        },
        {
          color: 'error',
          dataCy: 'btnCancelar',
          emit: 'input',
          icon: 'mdi-close-circle-outline',
          title: 'Cancelar'
        }
      ]
    }
  },

  watch: {
    value (val) {
      if (!this.value) this.confirmacaoAviso = false
    }
  },

  destroyed () {
    window.removeEventListener('keydown', this.checkKeys)
  },

  mounted () {
    window.addEventListener('keydown', this.checkKeys)
  },

  methods: {
    checkKeys (event) {
      if (event.keyCode === 27) {
        this.$emit('input')
      }
    }
  }
}
</script>
