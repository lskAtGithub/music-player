import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { useInitTheme } from './hooks/theme'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
useInitTheme()
app.mount('#app')
