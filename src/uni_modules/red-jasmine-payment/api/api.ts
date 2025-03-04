import { unInstance } from '@/service'

/**
 * 客户端信息
 */
export interface Client {
  agent?: string
  ip?: string
  name?: string
  /**
   * 平台
   */
  platform?: Platform
  /**
   * 客户端类型
   */
  type?: Type
  version?: string
  [property: string]: any
}

/**
 * 平台
 */
export enum Platform {
  Alipay = 'alipay',
  Other = 'other',
  Wechat = 'wechat',
}

/**
 * 客户端类型
 */
export enum Type {
  App = 'app',
  Applet = 'applet',
  Wap = 'wap',
  Web = 'web',
}

export interface Device {
  brand?: string
  extensions?: string
  id?: string
  language?: string
  model?: string
  /**
   * 系统
   */
  os?: string
  token?: string
  /**
   * 版本
   */
  version?: string
  [property: string]: any
}

/**
 * 支付者
 */
export interface Payer {
  account?: string
  appId?: string
  name?: string
  openId?: string
  type?: string
  userId?: string
  [property: string]: any
}

export enum Scene {
  Jsapi = 'jsapi',
  Wap = 'wap',
  Web = 'web',
}

export interface Sdk {
  name: string
  version: string
  [property: string]: any
}
/**
 * Request
 */
export interface Request {
  /**
   * 客户端信息
   */
  client?: Client
  device?: Device
  /**
   * 商户应用
   */
  merchant_app_id: string
  trade_no: string
  /**
   * 支付者
   */
  payer?: Payer
  scene: Scene
  method?: string
  sdk?: Sdk

  [property: string]: any
}
export function ready(data: Request) {
  return unInstance.post(`/api/payment/payer/trades/ready`, data)
}

export function paying(data: Request) {
  return unInstance.post(`/api/payment/payer/trades/paying`, data)
}
