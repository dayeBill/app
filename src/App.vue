<script lang="ts" setup>
import login from '@/common/login'
import { useAppStore, useAuthStore } from '@/store'

const { darkMode, statusBarHeight, menuButtonBounding } = storeToRefs(useAppStore())
const auth = useAuthStore()
onLaunch(() => {
  // #ifdef MP-WEIXIN || MP-QQ
  const systemInfo = uni.getSystemInfoSync()

  // the systemInfo.theme is only support dark mode in WeChat and QQ
  darkMode.value = systemInfo?.theme === 'dark'
  statusBarHeight.value = systemInfo!.statusBarHeight || 44
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
  uni.onThemeChange((res: UniApp.OnThemeChangeCallbackResult) => darkMode.value = res.theme === 'dark')
  // #endif

  // #ifdef H5
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  darkMode.value = colorScheme.matches
  colorScheme.addEventListener('change', (e: MediaQueryListEvent) => darkMode.value = e.matches)
  // The data is obtained from iPhone13 miniprogram but statusBarHeight, top and bottom values are subtracted from the statusBarHeight value
  statusBarHeight.value = 0
  menuButtonBounding.value = { width: 87, height: 32, left: 281, top: 4, right: 368, bottom: 36 }
  // #endif

  // #ifdef H5
  if (window.parent !== window.self) {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'theme')
        darkMode.value = e.data.data === 'dark'
    })
  }
  // #endif

  const routeInterceptor = {
    invoke(options) {
      // 在路由跳转前执行逻辑
      console.log('路由跳转前执行逻辑:', options, auth.isLogin())
      const url = options.url.split('?')[0] // 获取要跳转的页面路径

      return true // 允许原始路由跳转
    },
    fail(err) {
      // 处理跳转失败的情况
      console.log('路由跳转失败:', err)
    },
  };
  ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach((method) => {
    uni.addInterceptor(method, routeInterceptor)
  })
})
onShow(() => {
  // #ifdef MP
  login.login()
  // #endif
})
onHide(() => {
})
</script>

<style lang="scss">
@import 'nutui-uniapp/styles/index';
</style>
