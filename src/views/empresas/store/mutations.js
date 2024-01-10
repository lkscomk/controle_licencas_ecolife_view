import day from '@/plugins/dayjs'
import { filter } from 'vue-input-facade'

export default {
  dropdownPortesEmpresa (state, param) {
    state.dropdownPortesEmpresa = param
  },
  dropdownStatusEmpresa (state, param) {
    state.dropdownStatusEmpresa = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.data_cadastro = element.data_cadastro ? day(element.data_cadastro).format('DD/MM/YYYY') : null
      element.cnpj = filter(element.cnpj, ['##.###.###/####-##'])
    })
    state.registros = param
  }
}
