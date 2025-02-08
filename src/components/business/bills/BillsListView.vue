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
    item.contact?.name,
    item.subject,
  ].join(' ')
}
</script>

<template>
  <ListView
    name="bills"
    :api="API.getPath()"
    :create-action="{ path: '/pages/bills/create', icon: 'plus' }"
  >
    <template #default="{ item, index }">
      <nut-cell>
        <template #icon>
          <nut-avatar
            size="small"
            custom-color="rgb(245, 106, 0)"
            bg-color="rgb(253, 227, 207)"
          >
            {{ item.contact?.name || '-' }}
          </nut-avatar>
        </template>
        <template #title>
          <p>
            {{ title(item) }}
          </p>
          <p>
            <nut-tag v-if="item.event" custom-color="#e9e9e9" text-color="#999999">
              {{ item.bill_category }}
            </nut-tag>
            <nut-tag custom-color="#e9e9e9" text-color="#999999">
              {{ item.bill_category }}
            </nut-tag>
          </p>
        </template>
        <template #desc>
          <p>
            <nut-price
              :symbol="item.bill_type === 'income' ? '+' : '-'"
              :price="item.amount_value"
              :style="{ color: item.bill_type === 'income' ? '#121212' : '' }"
              :need-symbol="true"
            />
          </p>

          <p> {{ item.bill_time }} </p>
        </template>
        <template #link />
      </nut-cell>
    </template>
  </ListView>
</template>

<style scoped>

</style>
