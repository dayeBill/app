import { login as loginApi } from '@/api/auth'
import { useAuthStore } from '@/store'

export default {

  async login() {
    console.log('开始登陆')

    // 判断是否登入
    // 判断是否有用户信息
    const auth = useAuthStore()

    if (!auth.token) {
      uni.getProvider({
        service: 'oauth',
        success(res) {
          uni.login({
            provider: res.provider[0], // 使用微信登录
            success(loginRes) {
              loginApi(loginRes.code, res.provider[0]).then((response) => {
                auth.setToken(response.data.data.token)
              })
            },
          })
        },
      })
    }
  },

}
