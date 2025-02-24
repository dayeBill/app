<script lang="ts" setup>
import { Contacts as ResourceApi } from '@/api/contacts'
import ListView from '@/components/ListView.vue'
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'

const props = defineProps({
  viewModel: {
    type: String,
    default: 'view',
  },
})
const API = new ResourceApi()
const pageHelpers = reactive({
  relationTypes: [],
})

onLoad(() => {
  API.enums().then((response) => {
    pageHelpers.relationTypes = response.data.data.relationTypes || []
  })
})
</script>

<template>
  <ListView
    :name="API.name"
    :api="API.getPath()"
    :view-model="props.viewModel"
    :create-action="{ path: '/pages/contacts/create', icon: 'plus' }"
  >
    <template #default="{ item, index }">
      <nut-cell :title="item.name">
        <template #icon>
          <nut-tag :type="pageHelpers.relationTypes.find((type) => type.label === item.relation_type)?.color">
            {{ item.relation_type }}
          </nut-tag>
        </template>
        <template #desc>
          {{ item.remarks }}
        </template>
      </nut-cell>
    </template>
  </ListView>
</template>

<style scoped>

</style>
