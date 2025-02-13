import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyRender } from '@/shared/directives/lazyRender'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('lazy-render', lazyRender)

app.mount('#app')
