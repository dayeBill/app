import { unInstance } from '@/service'

export function getUserInfo() {
  return unInstance.get('/api/user/info')
}
