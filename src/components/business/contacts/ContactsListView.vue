<script lang="ts" setup>
import { Contacts as ResourceApi } from '@/api/contacts'
import ListView from '@/components/ListView.vue'
import { defineProps } from 'vue'

const props = defineProps({
  viewModel: {
    type: String,
    default: 'view',
  },
})
const API = new ResourceApi()
</script>

<template>
  <ListView
    :api="API.getPath()"
    :view-model="props.viewModel"
    :create-action="{ path: '/pages/contacts/create', icon: 'plus' }"
  >
    <template #default="{ item, index }">
      <nut-cell :title="item.name">
        <template #icon />
        <template #desc>
          {{ item.remarks }}
        </template>
      </nut-cell>
    </template>
  </ListView>
</template>

<style scoped>

</style>
