import { unInstance } from '@/service'

export function password(data: object) {
  return unInstance.post('/api/auth/login/login', {
    provider: 'password',
    data,
  })
}
