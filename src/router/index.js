import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Workflow List',
      component: () => import('../views/workflowListView.vue')
    },
    {
      path: '/workflow/create',
      name: 'Create New Workflow',
      component: () => import('../views/workflowCreateView.vue')
    }
  ]
})

export default router
