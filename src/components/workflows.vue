<template>
  <div class="center">
    <h1>{{ store.getAppName }}</h1>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkflowStore } from '../stores/workflow'

const store = useWorkflowStore()

const title = ref('Workflow List')

setTimeout(() => {
  store.setAppName()
}, 2000)
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
