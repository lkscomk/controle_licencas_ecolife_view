<template>
  <div>
    <v-card
      outlined
      dense
      flat
    >
      <v-data-table
        :headers="colunas"
        :items="registros"
        :items-per-page="itensPorPagina"
        :footer-props="{
          itemsPerPageText: 'Linhas por página',
          itemsPerPageOptions: [10, 20, 30],
          itemsPerPageAll: 'Mostrar tudo',
          pageText: '{0}-{1} de {2}',
        }"
        dense
        no-data-text="Nenhum registro encontrado"
        style="border-radius: 1px !important;"
      >
        <template v-slot:[`item.acao`]="{ item }">
          <slot
            name="acao"
          />
          <v-btn
            v-if="excluir"
            :color="$vuetify.theme.dark ? 'white' : 'error'"
            class="botao-acao-tabela"
            data-cy="btnTableExibir"
            icon
            title="Excluir Registro"
            @click="$emit('excluir', item)"
          >
            <v-icon size="20">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            v-if="selecionar"
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="botao-acao-tabela"
            data-cy="btnTableExibir"
            icon
            title="Selecionar Registro"
            @click="$emit('selecionado', item)"
          >
            <v-icon size="20">
              mdi-check-bold
            </v-icon>
          </v-btn>
          <v-btn
            v-if="exibir"
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="botao-acao-tabela"
            data-cy="btnTableExibir"
            icon
            title="Exibir Registro"
            @click="$emit('exibir', item)"
          >
            <v-icon size="20">
              mdi-eye
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.status`]="{ item, value }">
          <v-btn
            v-if="value && value.chip"
            :color="value.color ? value.color : 'primary'"
            :class="`font-weight-bold ${value.class ? value.class : ''}`"
            depressed
            small
            text
          >
            {{ value.text }}
          </v-btn>

          <v-progress-circular
            v-else
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            :size="20"
            :width="2"
            indeterminate
          />

          <v-tooltip
            v-if="value && value.tooltip"
            bottom
            :activator="`#${item.empresa}`"
          >
            {{ value.tooltip }}
          </v-tooltip>
        </template>
        <template v-slot:[`item.tipo`]="{ item, value }">
          <v-btn
            v-if="value && value.chip"
            :color="value.color ? value.color : 'primary'"
            :class="`font-weight-bold ${value.class ? value.class : ''}`"
            depressed
            small
            text
          >
            {{ value.text }}
          </v-btn>

          <v-progress-circular
            v-else
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            :size="20"
            :width="2"
            indeterminate
          />

          <v-tooltip
            v-if="value && value.tooltip"
            bottom
            :activator="`#${item.empresa}`"
          >
            {{ value.tooltip }}
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    colunas: {
      required: true,
      type: Array
    },
    exibir: {
      default: false,
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    selecionar: {
      default: false,
      type: Boolean
    },
    registros: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      itensPorPagina: 10
    }
  }
}
</script>
