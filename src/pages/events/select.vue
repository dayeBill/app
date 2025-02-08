<script setup lang="ts">
import EventListView from '@/components/business/events/EventListView.vue'
</script>

<template>
  <EventListView />
</template>

<route lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "选择事件",
"enablePullDownRefresh":true
}
}
</route>

<style scoped>

</style>
