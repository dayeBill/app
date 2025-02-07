<script lang="ts" setup>
import { Bills as ResourceApi } from '@/api/bills'
import ListView from '@/components/ListView.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'

const pageHelpers = reactive({
  eventTypes: [],
})

onLoad(() => {
  new ResourceApi().options().then((response) => {
    pageHelpers.eventTypes = response.data.data.eventTypes
  })
})
function toCreatePage() {
  uni.navigateTo({
    url: '/pages/bills/create',
  })
}
</script>

<template>
  <ListView api="/api/bill/bills" @add="toCreatePage">
    <template #item="{ item, index }">
      <nut-cell :title="item.subject">
        <template #icon />
        <template #desc>
          {{ item.remarks }}
        </template>
      </nut-cell>
    </template>
  </ListView>
</template>

<route  lang="json">
{
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "账单",
"enablePullDownRefresh":true
}
}
</route>

<style scoped>

</style>
