import axios from '@/plugins/axios_local'

export const gerarRelatorio = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/sistema/gerar-relatorio', dados)
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
    const res = await axios.get('/empresa/' + id)

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
    const res = await axios.delete('/empresa/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const ativar = async ({ commit }, id) => {
  try {
    const res = await axios.put('/empresa/ativar/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const fecharEmpresa = async ({ commit }, id) => {
  try {
    const res = await axios.put('/empresa/fechar-empresa/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/empresa', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/empresa/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarCep = async ({ commit }, path) => {
  try {
    const res = await axios.get('/sistema/proxy/' + path)

    return res.data
  } catch (error) {
    return null
  }
}
