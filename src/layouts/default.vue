<!--
 * @Author: liushoukun liushoukun66@gmail.com
 * @Date: 2025-02-05 15:35:20
 * @LastEditors: liushoukun liushoukun66@gmail.com
 * @LastEditTime: 2025-02-07 11:43:59
 * @FilePath: \app\src\layouts\default.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    text: '首页',
    icon: 'home',
    name: 'home',
  },
  {
    pagePath: 'pages/bills/index',
    text: '账单',
    icon: 'order',
    name: 'bill',
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
    <nut-toast />
    <nut-notify />
    <!-- 支付宝小程序自定义 tabbar需要特殊处理 -->
    <!-- #ifndef MP-ALIPAY -->
    <nut-tabbar
      v-model="activeIndex"
      :active-color="aColor" :size="size" :unactive-color="unColor"
      bottom safe-area-inset-bottom placeholder @tab-switch="changeTab"
    >
      <nut-tabbar-item
        v-for="(item, index) in List"
        :id="index"
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
