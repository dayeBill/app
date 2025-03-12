import { pages, subPackages } from 'virtual:uni-pages'
import { useAuthStore } from '../store/auth'

export function interceptor() {
  const auth = useAuthStore()

  const routeInterceptor = {
    invoke(options) {
      // 在路由跳转前执行逻辑
      console.log('拦截器', pages, subPackages)
      console.log('路由跳转前执行逻辑:', options, auth.isLogin())
      const url = options.url.split('?')[0] // 获取要跳转的页面路径
      console.log('需要跳转的页面', url)

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
}
