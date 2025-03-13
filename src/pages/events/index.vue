<script lang="ts" setup>
import EventListView from '@/components/business/events/EventListView.vue'
</script>

<template>
  <EventListView />
</template>

<route  lang="json">
{
"auth":true,
  "style": {
    "navigationStyle": "default",
    "navigationBarTitleText": "礼簿",
    "enablePullDownRefresh":true
  }
}
</route>

<style scoped>

</style>
