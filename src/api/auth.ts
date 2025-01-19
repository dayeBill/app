import { unInstance } from '@/service'

export function login(code: string, provider: string) {
  return unInstance.post('/api/auth/auth', {
    code,
    provider,
  })
}
