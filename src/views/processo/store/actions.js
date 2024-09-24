import axios from '@/plugins/axios_local'

export const gerarRelatorio = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/sistema/gerar-relatorio', dados)
    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownStatusProcesso = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/10')

    if (!res.data.erro) {
      commit('dropdownStatusProcesso', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarDropdownStatusRma = async ({ commit }) => {
  try {
    const res = await axios.get('/sistema/opcoes/9')

    if (!res.data.erro) {
      commit('dropdownStatusRma', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

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

export const buscarDropdownPorteLicencas = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/7')

    if (!res.data.erro) {
      commit('dropdownPorteLicencas', res.data)
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

// processo
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

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/processo', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/processo/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluir = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/processo/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const desativar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/processo/desativar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const incluirArquivoMorto = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/processo/incluir-arquivo-morto/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}
// licenca

export const listarLicencas = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/licenca', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosLicencas', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibirLicenca = async ({ commit }, id) => {
  try {
    const res = await axios.get('/licenca/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarLicenca = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/licenca', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editarLicenca = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/licenca/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluirLicenca = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/licenca/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const ativarLicenca = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/licenca/ativar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const encerrarLicenca = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/licenca/encerrar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

// rma
export const listarRma = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/rma', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosRma', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibirRma = async ({ commit }, id) => {
  try {
    const res = await axios.get('/rma/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluirRma = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/rma/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarRma = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/rma', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editarRma = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/rma/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const gerarRma = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/rma/gerar-rma/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const ativarRma = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/rma/ativar/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}
