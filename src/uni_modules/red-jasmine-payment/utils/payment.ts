export function convertingPlatform(): string {
  // 获取打包平台

  console.log(uni.getSystemInfoSync().uniPlatform)

  const uniPlatformMapping = {
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
  return uniPlatformMapping[uni.getSystemInfoSync().uniPlatform] || 'other'
}
