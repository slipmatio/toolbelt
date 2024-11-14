import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import BrowserPage from './pages/BrowserPage.vue'
import VuePage from './pages/VuePage.vue'

const routes = [
  { path: '/', component: BrowserPage },
  { path: '/vue/', component: VuePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
