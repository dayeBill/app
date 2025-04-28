/*
 * @Author: liushoukun liushoukun66@gmail.com
 * @Date: 2025-04-15 23:19:22
 * @LastEditors: liushoukun liushoukun66@gmail.com
 * @LastEditTime: 2025-04-15 23:40:07
 * @FilePath: \app\src\uni_modules\red-jasmine-user\api\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { unInstance } from '@/service'

export function updateBaseInfo(data: any) {
  return unInstance.put('/api/user/base-info', data)
}

export function getUserBaseInfo() {
  return unInstance.get('/api/auth/info')
}
