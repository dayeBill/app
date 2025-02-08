<script setup lang="ts">
import { Bills as ResourceApi } from '@/api/bills'
import ListView from '@/components/ListView.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'

const API = new ResourceApi()
const pageHelpers = reactive({
  eventTypes: [],
})

onLoad(() => {
  new ResourceApi().options().then((response) => {
    pageHelpers.eventTypes = response.data.data.eventTypes || []
  })
})
function title(item) {
  return [
    item.bill_category,
    item.contact?.name,
    item.subject,
  ].join(' ')
}
</script>

<template>
  <ListView
    :api="API.getPath()"
    :create-action="{ path: '/pages/bills/create', icon: 'plus' }"
  >
    <template #default="{ item, index }">
      <nut-cell>
        <template #icon>
          <nut-avatar
            custom-color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)"
            size="small"
          >
            {{ item.contact?.name || '-' }}
          </nut-avatar>
        </template>
        <template #title>
          <p>{{ title(item) }}</p>
        </template>
        <template #desc>
          <nut-price
            :symbol="item.bill_type === 'income' ? '+' : '-'"
            :price="item.amount_value"
            :style="{ color: item.bill_type === 'income' ? '#121212' : '' }"
            :need-symbol="true"
          />
          <p> {{ item.bill_time }} </p>
        </template>
      </nut-cell>
    </template>
  </ListView>
</template>

<style scoped>

</style>
