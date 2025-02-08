<script lang="ts" setup>
import BillsListView from '@/components/business/bills/BillsListView.vue'
</script>

<template>
  <BillsListView />
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
