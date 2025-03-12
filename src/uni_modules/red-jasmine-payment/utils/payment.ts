export interface Client {
  agent?: string | null
  ip?: string | null
  name?: string | null
  /**
   * 平台
   */
  platform?: string | null
  /**
   * 客户端类型
   */
  type?: string | null
  version?: string | null

  [property: string]: any
}

export interface Sdk {
  name: string
  version: string

  [property: string]: any
}

/**
 * 支付者
 */
export interface Payer {
  account?: string | null
  app_id?: string | null
  name?: string | null
  open_id?: string | null
  type?: string | null
  user_id?: string | null

  [property: string]: any
}

export function getClient(): Client {
  return {
    agent: null,
    ip: null,
    name: null,
    version: null,
    type: convertingType(),
    platform: convertingPlatform(),
  }
}

/**
 * 设备信息
 */
export interface Device {
  brand?: string | null
  extensions?: string | null
  id?: string | null
  language?: string | null
  model?: string | null
  /**
   * 系统
   */
  os?: string | null
  token?: string | null
  /**
   * 版本
   */
  version?: string | null

  [property: string]: any
}

/**
 * 获取设备信息
 */
export function getDevice(): Device {
  try {
    const systemInfo = uni.getSystemInfoSync()
    console.log(systemInfo)
    return {
      brand: systemInfo.brand || null,
      extensions: null,
      id: systemInfo.deviceId || null,
      language: systemInfo.language || null,
      model: systemInfo.deviceModel || null,
      os: systemInfo.platform || null,
      token: null, // 根据实际情况设置
      version: systemInfo.version || null,
    }
  }
  catch (error) {
    console.error('获取设备信息失败', error)
    return {
      brand: null,
      extensions: null,
      id: null,
      language: null,
      model: null,
      os: null,
      token: null,
      version: null,
    }
  }
}

export function convertingType(): string {
  let type: string = 'web'
  // #ifdef APP
  type = 'app'
  // #endif
  // #ifdef MP
  type = 'applet'
  // #endif
  // #ifdef H5
  type = 'wap'
  // #endif
  return type
}

export function convertingPlatform(): string {
  // 获取打包平台

  const uniPlatformMapping: { [key: string]: string } = {
    'mp-weixin': 'wechat',
    'mp-alipay': 'alipay',
    'mp-baidu': 'baidu',
    'mp-toutiao': 'douyin',
    'mp-lark': 'lark',
    'mp-qq': 'qq',
    'mp-kuaishou': 'kuaishou',
    'mp-jd': 'jd',
    'mp-360': '360',
    'mp-harmony': 'harmony',
    'web': 'wap',
    'app': 'app',
  }
  try {
    const uniPlatform = uni.getSystemInfoSync().uniPlatform
    return uniPlatformMapping[uniPlatform] || 'other'
  }
  catch (error) {
    console.error('获取平台信息失败', error)
    return 'other'
  }
}

export function getScene(): string {
  let scene: string = 'web'
  // #ifdef APP
  scene = 'app'
  // #endif
  // #ifdef MP
  scene = 'jsapi'
  // #endif
  // #ifdef H5
  scene = 'wap'
  // #endif
  return scene
}

export interface PaymentEnvironment {
  /**
   * 客户端信息
   */
  client?: Client
  device?: Device
  scene: string
  method?: string | null
  sdk?: Sdk | null

  [property: string]: any
}

export function getPaymentEnvironment(): PaymentEnvironment {
  return {
    client: getClient(),
    scene: getScene(),
    device: getDevice(),

  }
}
