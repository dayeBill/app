import { login as loginApi } from '@/api/auth'
import { useAuthStore } from '@/store'

export default {

  async login() {
    // 判断是否登入
    // 判断是否有用户信息
    const auth = useAuthStore()
    console.log('用户token', auth.token)
    if (!auth.token) {
      uni.getProvider({
        service: 'oauth',
        success(res) {
          console.log(res.provider)

          uni.login({
            provider: res.provider[0], // 使用微信登录
            success(loginRes) {
              console.log(loginRes)
              loginApi(loginRes.code, res.provider[0]).then((response) => {
                console.log('111', response)
                auth.setToken(response.data.data.token)
              })
            },
          })
        },
      })
    }
  },

}
