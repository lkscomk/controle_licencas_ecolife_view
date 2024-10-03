import axios from '@/plugins/axios_local'

export const buscarDadosProcessosRegistro = async ({ commit }, id) => {
  try {
    const res = await axios.get('/dashboard/processos')

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDadosLicencasRegistro = async ({ commit }, id) => {
  try {
    const res = await axios.get('/dashboard/licencas')

    return res.data
  } catch (error) {
    return null
  }
}
