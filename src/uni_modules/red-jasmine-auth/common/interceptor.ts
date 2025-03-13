import { pages, subPackages } from 'virtual:uni-pages'
import { useAuthStore } from '../store/auth'

function getAllPages() {
  const allPages: Array<object> = []

  pages.forEach((page: object) => {
    page = JSON.parse(JSON.stringify(page))
    // 判断 page.path  是否以 / 开通
    allPages.push(page)
  })
  subPackages.forEach((subPackage: object) => {
    subPackage = JSON.parse(JSON.stringify(subPackage))
    subPackage.pages.forEach((subPackageItem: object) => {
      subPackageItem.path = `${subPackage.root}/${subPackageItem.path}`
      allPages.push(subPackageItem)
    })
  })
  return allPages
}

export function interceptor() {
  const allPages = getAllPages()
  const auth = useAuthStore()

  const routeInterceptor = {
    invoke(options) {
      // 在路由跳转前执行逻辑

      console.log('路由跳转前执行逻辑:', options, auth.isLogin())
      // 如果 url 包含 ?
      if (auth.isLogin()) {
        return true
      }
      const url = options.url
      let path = null
      if (url.includes('?')) {
        path = url.split('?')[0] // 获取要跳转的页面路径
      }
      else {
        path = url
      }

      // 判断 url 是否 以 / 开头 如果是 / 开头 那么去除
      if (path.startsWith('/')) {
        path = path.slice(1)
      }
      console.log('需要跳转的页面', path)
      // 找到当前页面数据
      const currentPage = allPages.find(page => page.path === path)
      console.log('当前页面数据', currentPage)
      // 判断页面是否需要登录
      if (currentPage.hasOwnProperty('auth') && currentPage.auth === true) {
        console.log('需要登录')
        uni.navigateTo({
          url: '/uni_modules/red-jasmine-auth/pages/login/login',
        })
        return false
      }

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
