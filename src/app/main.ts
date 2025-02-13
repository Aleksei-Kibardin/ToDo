import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyRender } from '@/shared/directives/lazyRender'
import Toast, { type PluginOptions } from 'vue-toastification'
import { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options: PluginOptions = {
  timeout: 3000,
  position: POSITION.TOP_CENTER,
}

app.use(Toast, options)

app.use(createPinia())
app.use(router)
app.directive('lazy-render', lazyRender)

app.mount('#app')
