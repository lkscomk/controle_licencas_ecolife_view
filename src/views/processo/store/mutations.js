import day from '@/plugins/dayjs'
import { filter } from 'vue-input-facade'

export default {
  setRegistrosEmpresas (state, param) {
    param.forEach(element => {
      element.status = { chip: true, color: String(element.status_cor), text: element.status_descricao }
      element.data_cadastro = element.data_cadastro ? day(element.data_cadastro).format('DD/MM/YYYY') : null
      element.cnpj = element.cnpj ? (String(element.cnpj).length <= 11 ? filter(String(element.cnpj).padStart(11, '0'), ['###.###.###-##']) : filter(String(element.cnpj).padStart(14, '0'), ['##.###.###/####-##'])) : '-'
    })
    state.registrosEmpresas = param
  },
  dropdownPorteLicencas (state, param) {
    state.dropdownPorteLicencas = param
  },
  dropdownPortesEmpresa (state, param) {
    state.dropdownPortesEmpresa = param
  },
  dropdownStatusRma (state, param) {
    state.dropdownStatusRma = param
  },
  dropdownStatusEmpresa (state, param) {
    state.dropdownStatusEmpresa = param
  },
  dropdownEstados (state, param) {
    state.dropdownEstados = param
  },
  dropdownCidadesEmpresa (state, param) {
    state.dropdownCidadesEmpresa = param
  },
  dropdownCidades (state, param) {
    state.dropdownCidades = param
  },
  dropdownTiposLicencas (state, param) {
    state.dropdownTiposLicencas = param
  },
  dropdownStatusLicencas (state, param) {
    state.dropdownStatusLicencas = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.tipo = { chip: true, color: element.tipo_cor, text: element.tipo_descricao }
      element.status = { chip: true, color: element.status_cor, text: element.status_descricao }
      element.cnpj = element.cnpj ? (String(element.cnpj).length <= 11 ? filter(String(element.cnpj).padStart(11, '0'), ['###.###.###-##']) : filter(String(element.cnpj).padStart(14, '0'), ['##.###.###/####-##'])) : '-'
      element.processo = element.processo || null
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registros = param
  },
  setRegistrosRma (state, param) {
    param.forEach(element => {
      element.status = { chip: true, color: element.status_cor, text: element.status_descricao }
      element.periodo_inicio = element.periodo_inicio ? day(element.periodo_inicio).format('DD/MM/YYYY') : null
      element.periodo_fim = element.periodo_fim ? day(element.periodo_fim).format('DD/MM/YYYY') : null
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registrosRma = param
  },
  setRegistrosLicencas (state, param) {
    param.forEach(element => {
      element.tipo = { chip: true, color: element.tipo_cor, text: element.tipo_descricao }
      element.status = { chip: true, color: element.status_cor, text: element.status_descricao }
      element.data_saida = element.data_saida ? day(element.data_saida).format('DD/MM/YYYY') : null
      element.data_vencimento = element.data_vencimento ? day(element.data_vencimento).format('DD/MM/YYYY') : null
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registrosLicencas = param
  },
  setRegistrosRelacionamento (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registrosRelacionamento = param
  }
}
