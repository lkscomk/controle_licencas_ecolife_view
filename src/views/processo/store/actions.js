import axios from '@/plugins/axios_local'

export const buscarDropdownStatusLicencas = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/6')

    if (!res.data.erro) {
      commit('dropdownStatusLicencas', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownTiposLicencas = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/3')

    if (!res.data.erro) {
      commit('dropdownTiposLicencas', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}
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

export const buscarDropdownEstados = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/estados')

    if (!res.data.erro) {
      commit('dropdownEstados', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownCidade = async ({ commit }, uf) => {
  try {
    const res = await axios.get('/sistema/cidade/' + uf)

    if (!res.data.erro) {
      commit('dropdownCidades', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}
export const buscarDropdownCidadeEmpresa = async ({ commit }, uf) => {
  try {
    const res = await axios.get('/sistema/cidade/' + uf)

    if (!res.data.erro) {
      commit('dropdownCidadesEmpresa', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const listarEmpresas = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/empresa', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosEmpresas', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibirEmpresas = async ({ commit }, id) => {
  try {
    const res = await axios.get('/empresa/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/processo', {
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
    const res = await axios.get('/processo/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const listarRelacionamento = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/opcoes', {
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

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/licenca', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/licenca/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluir = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/licenca/' + id)

    return res.data
  } catch (error) {
    return null
  }
}
