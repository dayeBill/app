import { useToken } from '@/composables/useToken'
import { DefaultToken } from '@/constants'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = useToken()
  const setToken = (newToken = DefaultToken) => {
    token.value = newToken
  }
  const clearToken = () => {
    token.value = DefaultToken
  }
  return {
    token,
    setToken,
    clearToken,
  }
})
