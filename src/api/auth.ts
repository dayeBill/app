import { unInstance } from '@/service'

export function login(provider: string, data: object, fallback_register: boolean = false) {
  return unInstance.post('/api/auth/login', {
    data,
    provider,
    fallback_register,
  })
}

export function userInfo() {
  return unInstance.get('/api/auth/info')
}
