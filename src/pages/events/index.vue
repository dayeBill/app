<script lang="ts" setup>
import ListView from '@/components/ListView.vue'
</script>

<template>
  <ListView api="/api/bill/events">
    <template #item="{ item, index }">
      <nut-cell :title="item.subject">
        <template #icon>
          {{ item.type }}
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
