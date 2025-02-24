import { unInstance } from '@/service'

export function userVip(appId: string, type: string) {
  return unInstance.get(`/api/vip/user/user-vips/${appId}/${type}`)
}

/**
 * 产品列表
 * @param appId
 * @param type
 */
export function products(appId: string, type: string) {
  return unInstance.get(`/api/vip/user/vip-products`, { params: {
    app_id: appId,
    type,
  } })
}

export function buy(data: object) {
  return unInstance.post(`/api/vip/user/vip-products/buy`, data)
}
