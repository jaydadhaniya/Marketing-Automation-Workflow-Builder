import { createRouter, createWebHistory } from 'vue-router'
import workflowListView from '../views/workflowListView.vue'
import workflowCreateView from '../views/workflowCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Workflow List',
      component: workflowListView
    },
    {
      path: '/workflow/create',
      name: 'Create New Workflow',
      component: workflowCreateView
    }
  ]
})

export default router
