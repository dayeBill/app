<script setup lang="ts">
import Resource from '@/api/resource'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { defineEmits, defineProps, onMounted, reactive } from 'vue'

const props = defineProps({
  api: {
    type: String,
    default: '',
  },
})
defineEmits(['add'])
const defaultQuery = {
  page: 1,
  per_page: 20,
}
const data = reactive({
  initLoading: false,
  bottomText: '加载中',
  bottomLoading: false,
  isNull: false,
  loading: false,
  hasMore: true, // 还有更多
  items: [],
  query: {
    page: 1,
    per_page: 20,
  },
  meta: {
    last_page: null,
    page: null,
    pageSize: 20,
    total: 0,
  },
})

onPullDownRefresh(() => {
  init()
  uni.stopPullDownRefresh()
})
onReachBottom(() => {
  data.bottomText = '加载中!'
  if (data.hasMore === false) {
    // 没有数据了
    data.bottomLoading = true
    data.bottomText = '已经到底了!'
    setTimeout(() => {
      data.bottomLoading = false
    }, 1000)
    return
  }

  if (data.bottomLoading === true)
    return
  data.bottomLoading = true
  data.query.page = data.query.page + 1
  getList().finally(() => {
    data.bottomLoading = false
  })
})

function init() {
  if (data.initLoading === true) {
    return
  }
  data.initLoading = true
  Object.assign(data.query, defaultQuery)
  data.items.length = 0

  getList().finally(() => {
    data.initLoading = false
  })
}

async function getList() {
  if (data.loading === true)
    return
  data.loading = true

  return new Promise(async (resolve, reject) => {
    try {
      const API = new Resource(props.api)
      const response = await API.index(data.query)

      data.items.push(...response.data.data)
      Object.assign(data.meta, response.data.meta)
      data.isNull = (data.meta.total === 0)
      data.loading = false
      data.hasMore = data.meta.current_page < data.meta.last_page

      resolve(response)
    }
    catch (error) {
      data.loading = false
      reject(new Error('错误'))
    }
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <nut-loading-page :loading="data.initLoading" />
  <nut-sticky>
    <nut-searchbar>
      <template #leftin>
        <nut-icon name="search2" />
      </template>
      <template #rightin>
        <nut-divider direction="vertical" />
        搜索
      </template>
      <template #rightout>
        <nut-icon name="uploader" @click="$emit('add')" />
      </template>
    </nut-searchbar>
  </nut-sticky>
  <view v-for="(item, index) in data.items" :key="index">
    <slot name="item" :item="item" :index="index">
      {{ item.id }}
    </slot>
  </view>
  <nut-divider v-if="data.bottomLoading">
    {{ data.bottomText }}
  </nut-divider>
  <nut-empty v-if="data.isNull" description="无数据" />
</template>

<style scoped>

</style>
