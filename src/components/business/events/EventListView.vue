<script setup lang="ts">
import { Events as ResourceApi } from '@/api/events'
import ListView from '@/components/ListView.vue'
import { onLoad } from '@dcloudio/uni-app'
import { defineProps, reactive } from 'vue'

const props = defineProps({
  viewModel: {
    type: String,
    default: 'view',
  },
})
const API = new ResourceApi()
const pageHelpers = reactive({
  eventTypes: [],
})

onLoad(() => {
  new ResourceApi().enums().then((response) => {
    pageHelpers.eventTypes = response.data.data.eventTypes
  })
})
</script>

<template>
  <ListView
    :view-model="props.viewModel"
    :name="API.name"
    :api="API.getPath()"
    :create-action="{ path: '/pages/events/create', icon: 'plus' }"
  >
    <template #default="{ item, index }">
      <nut-cell :title="item.subject">
        <template #icon>
          <nut-tag :type="pageHelpers.eventTypes.find((type) => type.value === item.type)?.color">
            {{ pageHelpers.eventTypes.find((type) => type.value === item.type)?.label }}
          </nut-tag>
        </template>
        <template #desc>
          {{ item.event_date }}
        </template>
      </nut-cell>
    </template>
  </ListView>
</template>

<style scoped>

</style>
