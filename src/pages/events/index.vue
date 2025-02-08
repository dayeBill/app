<script lang="ts" setup>
import EventListView from '@/components/business/events/EventListView.vue'
</script>

<template>
  <EventListView />
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
