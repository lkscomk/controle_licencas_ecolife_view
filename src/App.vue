<template>
  <v-app>
    <notificacao />
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
  .v-input {
    color: #000 !important;
    font-weight: 400 !important;
  }
  .v-label.theme--light {
    color: #000 !important;
    font-weight: 400 !important;
  }
  .theme--light.v-label--is-disabled {
    color: #000 !important;
    font-weight: 400 !important;
  }
  .theme--light.v-input--is-disabled {
    color: #000 !important;
    background: #EEEEEE !important;
    font-weight: bold !important;
    font-weight: 400 !important;
    pointer-events: all !important;
  }

  .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
    color: #000 !important;
    font-weight: 400 !important;
  }
  .theme--light.v-select .v-select__selection--disabled {
    color: #000 !important;
    background: #EEEEEE !important;
    font-weight: 400 !important;
  }
  .theme--light.v-data-table {
    color: #000 !important;
    font-weight: 500 !important;
  }

  .v-select__selections {
    flex-wrap: nowrap !important;
  }

  .v-data-table {
    white-space: nowrap !important;
  }

  .v-textarea textarea {
    line-height: 1.3rem !important;
  }

  @import './assets/css/app.scss'
</style>
