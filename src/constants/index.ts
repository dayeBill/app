import pkg from '@/../package.json'
import { pascalCase } from 'change-case'

const ViteMode = import.meta.env.VITE_MODE || 'production'
const PascalCaseViteMode = pascalCase(ViteMode)

export { default as pkg } from '@/../package.json'

// 请求
/** 默认请求基地址 */
export const DefaultBaseUrl = import.meta.env.VITE_BASE_API || 'https://jsonplaceholder.typicode.com/'
/** 默认请求头 */
export const DefaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.version}`,
}

/** 登录态键 */
export const TokenKey = `token`
/** 默认登录态 */
export const DefaultToken = ''

export const ThemeKey = `theme${PascalCaseViteMode}`
