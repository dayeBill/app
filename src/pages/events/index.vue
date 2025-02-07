<script lang="ts" setup>
import { Events } from '@/api/events'
import ListView from '@/components/ListView.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'

const pageHelpers = reactive({
  eventTypes: [],
})

onLoad(() => {
  new Events().options().then((response) => {
    pageHelpers.eventTypes = response.data.data.eventTypes
  })
})
function toCreatePage() {
  uni.navigateTo({
    url: '/pages/events/create',
  })
}
</script>

<template>
  <ListView api="/api/bill/events" @add="toCreatePage">
    <template #item="{ item, index }">
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

<route  lang="json">
{
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "事件",
    "enablePullDownRefresh":true
  }
}
</route>

<style scoped>

</style>
