<script setup lang="ts">
import ContactsListView from '@/components/business/contacts/ContactsListView.vue'
</script>

<template>
  <ContactsListView view-model="select" />
</template>

<route  lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "选择联系人",
"enablePullDownRefresh":true
}
}
</route>

<style scoped>

</style>
