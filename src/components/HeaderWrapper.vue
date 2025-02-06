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
    const Height = ref<string>('80px')

    // 获取系统信息并设置状态栏高度和右侧安全区域宽度
    const setSafeArea = () => {
      const px = 'px' // 单位
      const windowInfo = uni.getWindowInfo() // 获取窗口信息

      // 设置状态栏高度
      statusBarHeight.value = `${windowInfo.statusBarHeight}${px}`

      // 在微信小程序中，计算胶囊菜单的宽度
      if (uni.getMenuButtonBoundingClientRect) {
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        Height.value = `${menuButtonInfo.bottom}${px}`

        rightSafeArea.value = `${windowInfo.windowWidth - menuButtonInfo.left}${px}`
      }
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
  <view class="header-wrapper" :style="{ Height, paddingTop: statusBarHeight, width: '100%' }">
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
