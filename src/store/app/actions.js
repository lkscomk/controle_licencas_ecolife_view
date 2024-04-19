import axios from '@/plugins/axios_local'

export const login = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/sistema/login', dados)

    if (res.data.token) {
      localStorage.setItem('umbrella:token', res.data.token)
      localStorage.setItem('umbrella:email', window.btoa(res.data.email))
      localStorage.setItem('umbrella:nome', window.btoa(res.data.nome))
      localStorage.setItem('umbrella:login', window.btoa(res.data.login))
      localStorage.setItem('umbrella:perfil', window.btoa(res.data.id))

      axios.defaults.headers.Authorization = 'Bearer ' + res.data.token
      axios.defaults.headers['X-Login'] = res.data.login
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarAcessos = async ({ commit }, id) => {
  try {
    const res = await axios.get('/sistema/acessos_tela/' + id)

    if (!res.data.erro) {
      localStorage.setItem('umbrella:acessos_usuario', window.btoa(res.data))
      commit('acessos_usuario', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const logout = async ({ commit }) => {
  localStorage.removeItem('umbrella:token')
  localStorage.removeItem('umbrella:nome')
  localStorage.removeItem('umbrella:email')
  localStorage.removeItem('umbrella:login')

  delete axios.defaults.headers.Authorization
}

export const buscarPathImagem = async ({ commit }, id) => {
  try {
    const res = await axios.get('/anexos/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarNotificacoes = async ({ commit }, params) => {
  try {
    const res = await axios.get('/notificacoes')

    if (!res.data.erro) {
      commit('setRegistrosNotificacoes', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const registrarCiencia = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/notificacoes/registrar_ciencia/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const listarAnexos = async ({ commit }, params) => {
  try {
    const res = await axios.get('/anexos', {
      params
    })

    if (!res.data.erro) {
      commit('setRegistrosAnexos', res.data)
    }

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

export const salvarAnexo = async ({ state }, params) => {
  try {
    const res = await axios.post('/anexos', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const editarAnexo = async ({ state }, body) => {
  try {
    const res = await axios.put('/anexos/' + body.id, body)
    return res.data
  } catch (error) {
    return null
  }
}

export const excluirAnexo = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/anexos/' + id)

    return res.data
  } catch (error) {
    return null
  }
}
