<script lang="ts" setup>
import { Contacts as ResourceApi } from '@/api/contacts'
import ContactsListView from '@/components/business/contacts/ContactsListView.vue'
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
</script>

<template>
  <ContactsListView />
</template>

<route lang="json">
{
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "联系人",
"enablePullDownRefresh":true
}
}
</route>

<style scoped>

</style>
