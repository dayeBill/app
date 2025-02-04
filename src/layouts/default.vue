<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
const page = ref(getCurrentPages()[0].route)
const activeIndex = ref()
const aColor = ref('#fa2c19')
const unColor = ref('#84929A')
const size = ref('24rpx')

const List = [
  {
    pagePath: 'pages/index/index',
    text: '账单',
    icon: 'order',
    name: 'home',
  },
  {
    pagePath: 'pages/contacts/index',
    text: '联系人',
    icon: 'people',
    name: 'contacts',
  },
  {
    pagePath: 'pages/events/index',
    text: '事件',
    icon: 'addfollow',
    name: 'events',
  },
  {
    pagePath: 'pages/my/index',
    text: '我的',
    icon: 'my',
    name: 'my',
  },
]

onShow(async () => {
  // 如果 也没路径为 List 等于 中一个元素的 pagePath 属性
  for (let index = 0; index < List.length; index++) {
    const item = List[index]

    if (item.pagePath === page.value) {
      console.log('当前数据22', item.pagePath, page.value, index, item.name)
      activeIndex.value = item.name
      break // 找到匹配项后立即停止循环
    }
  }
})

function changeTab(_: any, index: number | string) {
  console.log('....测试', _.name)

  const pagePath = List.find(item => item.name === _.name)?.pagePath
  uni.switchTab({
    url: `/${pagePath}`,
  })
}
</script>

<template>
  <nut-config-provider :theme="darkMode ? 'dark' : ''">
    <slot />
    <!-- 支付宝小程序自定义 tabbar需要特殊处理 -->
    <!-- #ifndef MP-ALIPAY -->
    <nut-tabbar
      v-model="activeIndex" :active-color="aColor" :size="size" :unactive-color="unColor"
      bottom placeholder safe-area-inset-bottom @tab-switch="changeTab"
    >
      <nut-tabbar-item
        v-for="(item, index) in List"
        :key="item.name"
        :icon="item.icon" :page-path="item.pagePath" :name="item.name" :tab-title="item.text"
      />
    </nut-tabbar>
    <!-- #endif -->
  </nut-config-provider>
</template>

<style>
.header {
  color: #fff;
  background-color: black;
}
</style>
