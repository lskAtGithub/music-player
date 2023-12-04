import type { Directive, DirectiveBinding } from 'vue'

const createMask = (el: HTMLElement, icon: string) => {
  const mask = document.createElement('div')
  mask.classList.add('mask')
  mask.style.position = 'absolute'
  mask.style.top = '0'
  mask.style.left = '0'
  mask.style.width = '100%'
  mask.style.height = '100%'
  mask.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
  mask.style.display = 'flex'
  mask.style.justifyContent = 'center'
  mask.style.alignItems = 'center'

  el.appendChild(mask)
}

const removeMask = (el: HTMLElement) => {
  const mask = el.querySelector('.mask')
  if (mask) {
    el.removeChild(mask)
  }
}

const install: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    el.addEventListener('mouseenter', () => {
      createMask(el, value)
    })
    el.addEventListener('mouseleave', () => {
      removeMask(el)
    })
  }
}

export default { name: 'mask', install }
