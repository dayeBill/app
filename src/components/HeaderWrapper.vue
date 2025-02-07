<!--
 * @Author: liushoukun liushoukun66@gmail.com
 * @Date: 2025-02-07 10:02:20
 * @LastEditors: liushoukun liushoukun66@gmail.com
 * @LastEditTime: 2025-02-07 11:09:21
 * @FilePath: \app\src\components\HeaderWrapper.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HeaderWrapper',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    // 状态栏高度
    const statusBarHeight = ref<string>('var(--status-bar-height)')
    // 右侧安全区域的宽度（胶囊菜单宽度）
    const rightSafeArea = ref<string>('0px')
    const Height = ref<string>('calc(44px + env(safe-area-inset-top))')

    // 获取系统信息并设置状态栏高度和右侧安全区域宽度
    const setSafeArea = () => {
      const px = 'px' // 单位
      const windowInfo = uni.getWindowInfo() // 获取窗口信息

      // 设置状态栏高度
      statusBarHeight.value = `${windowInfo.statusBarHeight}${px}`

      // #ifdef MP
      // 在微信小程序中，计算胶囊菜单的宽度
      if (uni.getMenuButtonBoundingClientRect) {
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        Height.value = `${menuButtonInfo.bottom}${px}`
        rightSafeArea.value = `${windowInfo.windowWidth - menuButtonInfo.left}${px}`
      }
      // #endif
    }

    // 在组件挂载时设置安全区域
    onMounted(() => {
      setSafeArea()
    })

    return {
      Height,
      statusBarHeight,
      rightSafeArea,
    }
  },
})
</script>

<template>
  <view class="header-wrapper" :style="{ height: Height, paddingTop: statusBarHeight, width: '100%' }">
    <slot>
      <div class="mx-auto h-full flex items-center justify-center">
        {{ title }}
      </div>
    </slot>
  </view>
</template>

<style scoped>
.header-wrapper {
  box-sizing: border-box; /* 包含内边距和边框 */
  background-color: #fff; /* 背景颜色 */
}
</style>
