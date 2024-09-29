<template>
  <div class="center">
    <div class="dF aC mb-3">
      <a-input v-model:value="search" placeholder="Search for a workflow..." size="large" style="width: 300px;">
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <div class="mx-4 dash-divider"> </div>
      <a-button @click="addWorkflow" type="primary" size="large">
        <template #icon>
          <PlusOutlined />
        </template>
        ADD A WORKFLOW
      </a-button>
    </div>
    <a-table :columns="store.columns" :data-source="workflows" :showSorterTooltip="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'sharing'">
          <a-tooltip>
            <template #title>
              <div>
                Private: Only visible to you.
              </div>
              <div>
                Shared: Visible to everyone.
              </div>
            </template>
            Sharing
            <QuestionCircleOutlined />
          </a-tooltip>
        </template>
        <template v-if="column.key === 'workflowType'">
          <a-tooltip>
            <template #title>
              <div>
                Recurring Workflow: A recurring workflow runs indefinitely, triggering with each
                form submission until manually stopped.
              </div>
              <br>
              <div>
                Single Trigger Workflow: A single trigger workflow runs only one time for a
                predefined set of leads based on selected tags.
              </div>
            </template>
            Workflow Type
            <QuestionCircleOutlined />
          </a-tooltip>
        </template>
      </template>

      <template #bodyCell="{ column, record: workflow }">
        <template v-if="column.key === 'entryPoints'">
          <div v-if="workflow.tags.length" class="mb-2">
            Tags:
            <a-tooltip :title="allTags(workflow.tags)" class="dF aC" overlayClassName="change-tooltip-color">
              <div class="first-tag">
                {{ workflow.tags?.[0]?.name }}
              </div>
              <div v-if="workflow.tags.length > 1" class="tag-count">
                {{ `+${workflow.tags.length - 1}` }}
              </div>
            </a-tooltip>
          </div>
          <div v-if="workflow.forms.length">
            Form Submissions:
            <a-tooltip :title="allForms(workflow.forms)" class="dF aC" overlayClassName="change-tooltip-color">
              <div class="first-tag">
                {{ workflow.forms?.[0]?.name }}
              </div>
              <div v-if="workflow.forms.length > 1" class="tag-count">
                {{ `+${workflow.forms.length - 1}` }}
              </div>
            </a-tooltip>
          </div>
        </template>
        <template v-else-if="column.key === 'sharing'">
          <a-tag :color="workflow.sharing === 'private' ? 'red' : 'green'" style="font-size:14px;" class="p-1">
            {{ workflow.sharing === 'private' ? 'Private' : 'Shared' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'status'">
          <span class="badge-offer tT" :class="statusesColor[workflow.status] || 'badge'">
            {{ statuses[workflow.status] || workflow.status }}
          </span>
        </template>
        <template v-else-if="column.key === 'workflowType'">
          <a-tag v-if="workflow.forms.length" color="orange" style="font-size:14px;" class="p-1">
            Recurring
          </a-tag>
          <a-tag v-else color="purple" style="font-size:14px;" class="p-1">
            Single Trigger
          </a-tag>
        </template>
        <template v-else-if="column.key === 'scheduledAt'">
          {{ formatDate(workflow.scheduledAt, 'lll') }}
        </template>
        <template v-else-if="column.key === 'startedAt'">
          {{ formatDate(workflow.startedAt, 'lll') }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <!-- View, Edit, Start, Stop actions -->
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router';
  import moment from 'moment'
  import { useWorkflowStore } from '../stores/workflow'

  const router = useRouter();
  const store = useWorkflowStore();

  const search = ref('');

  const workflows = computed(() => {
    const list = store.workflowList;
    if (search.value) {
      return list.filter((workflow) => {
        const s = search.value.toLowerCase()
        return (
          workflow.readableId.toLowerCase().includes(s) ||
          workflow.name.toLowerCase().includes(s) ||
          workflow.description.toLowerCase().includes(s)
        )
      });
    }
    return list
  });


  function addWorkflow() {
    return router.push('workflow/create')
  }

  function allTags(tags) {
    return tags.map(t => t.name).join(', ')
  }

  function allForms(forms) {
    return forms.map(f => f.name).join(', ')
  }

  function formatDate(date, format = 'lll') {
    return date ? moment(date).format(format) : ''
  }

  const statuses = {
    'draft': 'Draft',
    'not_started': 'Not Started',
    'in_progress': 'In Progress',
    'completed': 'Completed',
    'stopped': 'Stopped',
  };

  const statusesColor = {
    draft: 'bg-gray text-white',
    not_started: 'bg-black text-white',
    in_progress: 'bg-orange text-white',
    completed: 'bg-green text-white',
    stopped: 'bg-red text-white',
  }
</script>

<style scoped>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .first-tag {
    background-color: #f7f5f9;
    border-radius: 5px;
    border: 1px solid #d0c9d6;
    display: block;
    word-wrap: break-word;
    white-space: normal;
    width: fit-content;
    padding: 0 10px;
  }

  .tag-count {
    background-color: #f7f5f9;
    border-radius: 5px;
    border: 1px solid #d0c9d6;
    width: fit-content;
    padding: 0 10px;
    margin-left: 10px;
  }

  .badge-offer {
    padding: .35rem .65rem;
    text-align: center;
    display: inline-block;
    border-radius: .2rem;
    background: #aaa;
  }

  .bg-gray {
    background-color: #aaa;
    color: white;
  }

  .bg-black {
    background-color: #40454c;
    color: white;
  }

  .bg-orange {
    background-color: #f7941e;
    color: white;
  }

  .bg-green {
    background-color: #00C48C;
    color: white;
  }

  .bg-red {
    background-color: #a90d2c;
    color: white;
  }

  .popoverContent {
    height: max-content;
    line-height: 30px;
    padding: 0 10px;
  }

  .popoverContent:hover {
    background-color: #fafafa;
    color: #007bff;
    cursor: pointer;
  }
</style>
