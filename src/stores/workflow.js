import { defineStore, acceptHMRUpdate } from 'pinia'
import { workflows } from './testData'

export const useWorkflowStore = defineStore('workflow', {
  state: () => {
    return {
      columns: [
        {
          title: 'ID',
          key: 'readableId',
          dataIndex: 'readableId',
          sorter: true
        },
        {
          title: 'Name',
          key: 'name',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: 'Description',
          key: 'description',
          dataIndex: 'description',
          sorter: true
        },
        {
          title: 'Entry Points',
          key: 'entryPoints',
          sorter: true
        },
        {
          name: 'sharing',
          key: 'sharing',
          dataIndex: 'sharing',
          sorter: true
        },
        {
          title: 'Status',
          key: 'status',
          sorter: true
        },
        {
          name: 'workflowType',
          key: 'workflowType',
          sorter: true
        },
        {
          title: 'Schedule DateTime',
          key: 'scheduledAt',
          sorter: true
        },
        {
          title: 'Date Started',
          key: 'startedAt',
          sorter: true
        },
        {
          title: '',
          key: 'actions'
        }
      ],
      workflows: workflows
    }
  },
  getters: {
    workflowList: (state) => {
      const workflows = JSON.parse(JSON.stringify(state.workflows))
      let localWorkflows = localStorage.getItem('workflows') || []
      return [...workflows, ...localWorkflows]
    }
  },
  actions: {
    saveWorkflow(workflow) {
      // In real word here should be API call instead of setting item in local storage
      let localWorkflows = localStorage.getItem('workflows')
      localWorkflows.push(workflow)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(acceptHMRUpdate, import.meta.hot))
}
