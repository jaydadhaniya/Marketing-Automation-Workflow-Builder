import { defineStore } from 'pinia'

export const useWorkflowStore = defineStore('workflow', {
  state: () => {
    return {
      appName: 'Marketing Automation Workflow Builder'
    }
  },
  getters: {
    getAppName: (state) => state.appName.toLocaleUpperCase()
  },
  actions: {
    setAppName() {
      this.appName = 'This is Marketing Automation Workflow Builder'
    }
  }
})
