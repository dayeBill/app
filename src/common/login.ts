import { login as loginApi, userInfo as UserInfoApi } from '@/api/auth'
import { useAuthStore } from '@/store'

export default {

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
      UserInfoApi().then(() => {
      }).catch((error) => {
        if (error.response.status === 401) {
          // 401 错误
          // 清除 Token
          auth.clearToken()
        }
      })
    }

    if (!auth.token) {
      // TODO 获取 Token

      // 小程序登录流程
      // #ifdef MP
      await this.mp()
      // #endif

      // H5 登录流程
    }
  },

  async mp() {
    const auth = useAuthStore()
    const accountInfo = uni.getAccountInfoSync()
    const appId = accountInfo.miniProgram.appId

    uni.getProvider({
      service: 'oauth',
      success(res) {
        const provider = res.provider[0]

        uni.login({
          provider, // 使用微信登录
          success(loginRes) {
            loginApi('socialite', {
              client_id: appId,
              provider: res.provider[0],
              code: loginRes.code,
            }, true).then((response) => {
              auth.setToken(response?.data?.data?.access_token)
            })
          },
        })
      },
    })
  },

}
