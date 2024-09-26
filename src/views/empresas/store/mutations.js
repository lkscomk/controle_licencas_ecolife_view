import day from '@/plugins/dayjs'
import { filter } from 'vue-input-facade'

export default {
  dropdownPrioridadeEmpresa (state, param) {
    state.dropdownPrioridadeEmpresa = param
  },
  dropdownPortesEmpresa (state, param) {
    state.dropdownPortesEmpresa = param
  },
  dropdownStatusEmpresa (state, param) {
    state.dropdownStatusEmpresa = param
  },
  dropdownEstados (state, param) {
    state.dropdownEstados = param
  },
  dropdownCidades (state, param) {
    param.forEach(element => {
      element.codigo = String(element.codigo)
    })
    state.dropdownCidades = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.status = { chip: true, color: String(element.status_cor), text: element.status_descricao }
      element.data_cadastro = element.data_cadastro ? day(element.data_cadastro).format('DD/MM/YYYY') : null
      element.cnpj = element.cnpj ? (String(element.cnpj).length <= 11 ? filter(String(element.cnpj).padStart(11, '0'), ['###.###.###-##']) : filter(String(element.cnpj).padStart(14, '0'), ['##.###.###/####-##'])) : '-'
    })
    state.registros = param
  }
}
