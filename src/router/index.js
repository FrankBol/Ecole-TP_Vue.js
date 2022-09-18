import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Add from '../views/AjoutSites.vue'
import NotFound from '../views/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Accueil
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
  ]
})

export default router
