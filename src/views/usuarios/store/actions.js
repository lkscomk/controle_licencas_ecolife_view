import axios from '@/plugins/axios_local'

export const buscarDropdownStatusUsuarios = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/12')

    if (!res.data.erro) {
      commit('dropdownStatusUsuario', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownTiposUsuarios = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/2')

    if (!res.data.erro) {
      commit('dropdownTiposUsuarios', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/usuario', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistros', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    const res = await axios.get('/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluir = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/usuario', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/usuario/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const resetSenha = async ({ commit }, id) => {
  try {
    const res = await axios.put('/usuario/reset-senha/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const ativarUsuario = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/usuario/ativar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const desativarUsuario = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/usuario/desativar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}
