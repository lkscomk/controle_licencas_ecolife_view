import axios from '@/plugins/axios_local'

export const buscarDropdownStatusEmpresa = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/4')

    if (!res.data.erro) {
      commit('dropdownStatusEmpresa', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownPortesEmpresa = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/5')

    if (!res.data.erro) {
      commit('dropdownPortesEmpresa', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/empresa', {
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

export const listarRelacionamento = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/usuario', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosRelacionamento', res.data)
    }

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
