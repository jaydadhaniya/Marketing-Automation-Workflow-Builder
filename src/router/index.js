import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Workflow List',
      component: () => import('../views/workflowListView.vue')
    }
  ]
})

export default router
