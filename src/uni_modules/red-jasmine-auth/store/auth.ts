import { useStorageSync } from '@uni-helper/uni-use'
import { defineStore } from 'pinia'

// import type { RemovableRef } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

const TokenKey: string = 'token'
const DefaultToken: string = ''

export function useToken(initialToken: string = ''): RemovableRef<string> {
  const token = useStorageSync(TokenKey, initialToken)
  return token
}

export const useAuthStore = defineStore('auth', () => {
  const token = useToken()
  const setToken = (newToken = DefaultToken) => {
    token.value = newToken
  }
  const clearToken = () => {
    token.value = DefaultToken
  }
  const isLogin = () => {
    if (token.value) {
      return true
    }
    return false
  }
  return {
    token,
    isLogin,
    setToken,
    clearToken,
  }
})
