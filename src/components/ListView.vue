<script setup lang="ts">
import Resource from '@/api/resource'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { defineProps, onMounted, reactive } from 'vue'

const props = defineProps({
  api: {
    type: String,
    default: '',
  },

})

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
    lastPage: null,
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
  getList(() => {
    data.bottomLoading = false
  })
})

function init() {
  if (data.initLoading === true) {
    return
  }
  data.initLoading = true
  data.query = defaultQuery
  data.items = []
  console.log('init--', data.query)
  getList(() => {
    data.initLoading = false
  })
}

function getList(callback?: Function) {
  if (data.loading === true)
    return
  data.loading = true
  const API = new Resource(props.api)
  API.index(data.query).then((response) => {
    data.items.push(...response.data.data)
    data.meta.lastPage = response.data.meta.last_page
    data.meta.page = response.data.meta.current_page
    data.meta.pageSize = response.data.meta.per_page
    data.meta.total = response.data.meta.total
    // 如果当前页码
    if (data.meta.page === data.meta.lastPage) {
      data.hasMore = false
    }
    else {
      data.hasMore = true
    }
  }).catch((error) => {

  }).finally(() => {
    data.loading = false
    callback ? callback() : null
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
        <nut-icon name="uploader" />
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
