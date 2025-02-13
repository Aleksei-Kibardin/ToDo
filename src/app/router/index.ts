import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
const HomePage = defineAsyncComponent(() => import('@/pages/Home/ui/HomePage.vue'))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/pages/Tasks/ui/TaskPage.vue'),
    },
  ],
})

export default router
