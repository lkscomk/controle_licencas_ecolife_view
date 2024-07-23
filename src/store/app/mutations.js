import day from '@/plugins/dayjs'

export default {
  setRegistrosAnexos (state, param) {
    state.registrosAnexos = param
  },
  acessos_usuario (state, param) {
    state.acessos_usuario = param
  },
  setRegistrosNotificacoes (state, param) {
    param.forEach(element => {
      element.status = { chip: true, color: String(element.cor), text: element.descricao }
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
      element.ciente_em = element.ciente_em ? day(element.ciente_em).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registrosNotificacoes = param
  },
  login (state, param) {
    state.login = param
  },
  reset: () => { },
  setNotificacao (state, { ativo, cor, icone, mensagem, tempo }) {
    state.notificacao = {
      ativo,
      cor,
      icone,
      mensagem,
      tempo
    }
  }
}
