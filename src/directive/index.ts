import mask from './modules/mask'

import type { App } from 'vue'

const directive = [mask]

function register(app: App) {
  directive.forEach((item) => {
    app.directive(item.name, item.install)
  })
}

export default register
