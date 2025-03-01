import axios from '@/plugins/axios_local'

export const buscarDropdownTipoUsuario = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/2') // tipos de usuario

    if (!res.data.erro) {
      commit('dropdownTipoUsuario', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarUsuario = async ({ commit }, id) => {
  try {
    const res = await axios.get('/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarUsuario = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/usuario/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarPathImagem = async ({ commit }, id) => {
  try {
    const res = await axios.get('/anexos/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarImagemUsuario = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/anexos', dados, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return res.data
  } catch (error) {
    return null
  }
}

export const editarSenhaUsuario = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/usuario/alterar-senha/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const exibirAnexo = async ({ commit }, arquivo) => {
  try {
    const res = await axios.get('/anexos/download/' + arquivo, {
      responseType: 'arraybuffer'
    })

    return res.data
  } catch (error) {
    return null
  }
}
