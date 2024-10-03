import axios from '@/plugins/axios_local'

export const buscarDadosProcessosCadastradosRegistro = async ({ commit }, id) => {
  try {
    const res = await axios.get('/dashboard/processos-cadastrados')

    return res.data
  } catch (error) {
    return null
  }
}
