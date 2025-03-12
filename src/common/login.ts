import { login as loginApi, userInfo as UserInfoApi } from '@/api/auth'
import { useAuthStore } from '@/store'

export default {

  checkLogin() {},

  async login() {
    // 判断平台  如果是小程序 那么就执行小程序登录
    // 如果是 H5  那么就需要执行 H5 登录
    // 判断是否登入
    // 判断是否有用户信息
    const auth = useAuthStore()
    if (auth.token) {
      // 无需每次都验证
      // token 是否过期
      // 直接调用用户信息获取
      try {
        await UserInfoApi()
      }
      catch (error) {
        // 401 错误
        if (error.response.status === 401) {
          // 清除 Token
          auth.clearToken()
          // 跳转登录
        }
      }
    }

    if (!auth.token) {
      // TODO 获取 Token

      // 小程序登录流程
      // #ifdef MP
      await this.mp()
      // #endif

      // H5 登录流程
      // #ifdef H5
      await this.h5Login()
      // #endif
    }
  },

  async mp() {
    const auth = useAuthStore()
    const accountInfo = uni.getAccountInfoSync()
    const appId = accountInfo.miniProgram.appId

    try {
      const res = await uni.getProvider({ service: 'oauth' })
      const provider = res.provider[0]

      const loginRes = await uni.login({ provider })
      const response = await loginApi('socialite', {
        client_id: appId,
        provider,
        code: loginRes.code,
      }, true)
      auth.setToken(response?.data?.data?.access_token)
    }
    catch (error) {
      console.error('小程序登录失败', error)
    }
  },

  async h5Login() {
    // H5 登录逻辑
    // 这里假设 H5 登录逻辑与小程序类似，需要根据实际情况调整
    const auth = useAuthStore()
    try {
      const res = await uni.getProvider({ service: 'oauth' })
      const provider = res.provider[0]

      const loginRes = await uni.login({ provider })
      const response = await loginApi('socialite', {
        provider,
        code: loginRes.code,
      }, true)
      auth.setToken(response?.data?.data?.access_token)
    }
    catch (error) {
      console.error('H5 登录失败', error)
    }
  },

}
