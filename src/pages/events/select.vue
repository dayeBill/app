<script setup lang="ts">
import EventListView from '@/components/business/events/EventListView.vue'
</script>

<template>
  <EventListView view-model="select" />
</template>

<route  lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "选择礼簿",
"enablePullDownRefresh":true
}
}
</route>

<style scoped>

</style>
