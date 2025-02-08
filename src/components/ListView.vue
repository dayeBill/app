<script lang="ts" setup>
import Resource from '@/api/resource'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { defineEmits, defineProps, reactive, useSlots } from 'vue'

const props = defineProps({
  viewModel: {
    type: String,
    default: 'view',
  },
  api: {
    type: String,
    default: '',
  },
  createActionDisabled: {
    type: Boolean,
    default: false,
  },
  createAction: {
    type: Object,
    default: () => {
      return {
        title: '新增',
        icon: 'plus',
        path: null,
      }
    },
  },
})

const emit = defineEmits(['clickCreate'])
const slots = useSlots()
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

const selects = reactive({
  ids: [],
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
    selects.ids = []
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

function clickCreate() {
  emit('clickCreate')
  // 判断是否配置 路径 或者 调用回掉函数
  uni.navigateTo({
    url: props.createAction.path,
  })
}

onLoad(() => {
  init()
})

function onCheckbox(value: any) {
  if (value.length > 0) {
    const values = []

    for (let i = 0; i < value.length; i++) {
      values.push(data.items.find(item => item.id === value[i]))
    }

    uni.$emit('list-view-select', values)
    uni.navigateBack({
      delta: 1,
    })
  }
}
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
        <nut-icon v-if="!createActionDisabled" name="uploader" @click="clickCreate" />
      </template>
    </nut-searchbar>
  </nut-sticky>
  <nut-checkbox-group
    ref="group"
    v-model="selects.ids"
    @change="onCheckbox"
  >
    <view v-for="(item, index) in data.items" :key="index" class="flex">
      <nut-checkbox
        v-if="viewModel === 'select'"
        :label="item.id"
        class="list-view-select"
      />
      <slot :index="index" :item="item" />
    </view>
  </nut-checkbox-group>
  <nut-divider v-if="data.bottomLoading">
    {{ data.bottomText }}
  </nut-divider>
  <nut-empty v-if="data.isNull" description="无数据" />
</template>

<style scoped>
.list-view-select{
  margin-right: 0px;
  margin-left: 10px;
  line-height: 20px;
}
</style>
