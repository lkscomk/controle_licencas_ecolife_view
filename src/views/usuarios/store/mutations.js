import day from '@/plugins/dayjs'
import { filter } from 'vue-input-facade'

export default {
  dropdownTiposUsuarios (state, param) {
    state.dropdownTiposUsuarios = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.tipo = { chip: true, color: String(element.tipo_cor), text: element.tipo_descricao }
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
      element.ultimo_login = element.ultimo_login ? day(element.ultimo_login).format('DD/MM/YYYY HH:mm:ss') : null
      element.cpf = filter(element.cpf, ['###.###.###-##'])
    })
    state.registros = param
  }
}
