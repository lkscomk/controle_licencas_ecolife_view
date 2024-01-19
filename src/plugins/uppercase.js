function upper (Vue) {
  Vue.directive('uppercase', (el, _binding, vnode) => {
    let value
    let selectionStart
    let selectionEnd

    if (el.tagName.toUpperCase() !== 'INPUT' && el.tagName.toUpperCase() !== 'TEXTAREA') {
      const input = el.getElementsByTagName('input')
      const textarea = el.getElementsByTagName('textarea')

      if (!input && !textarea) {
        throw new Error('Não encontrado input ou textarea')
      }

      el = input[0] || textarea[0]
      selectionStart = el.selectionStart
      selectionEnd = el.selectionEnd

      if (vnode.componentInstance.value && typeof vnode.componentInstance.value === 'string') {
        value = vnode.componentInstance.value.toUpperCase()
      }
    } else {
      if (vnode.elm.value) {
        value = vnode.elm.value.toUpperCase()
      }
    }

    if (value && el.value !== value) {
      el.value = value

      el.dispatchEvent(new Event('input'))
      el.setSelectionRange(selectionStart, selectionEnd)
    }
  })
}

export default upper
