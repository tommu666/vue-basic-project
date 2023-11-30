import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ApiPage from '../pages/ApiPage.vue'
import ForbiddenPage from '../pages/ForbiddenPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/api',
      name: 'Api',
      component: ApiPage,
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: ForbiddenPage,
      beforeEnter: (_to, from) => {
        if (from.name === 'Home') return true
        return false
      },
    },
  ],
})

export default router
