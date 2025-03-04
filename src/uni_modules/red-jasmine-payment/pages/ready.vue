<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import * as API from '../api/api'

const data = reactive({
  merchant_app_id: null,
  trade_no: null,
  trade: null,
})

function getPaymentInfo() {
  return {
    merchant_app_id: data.merchant_app_id,
    method: 'wechat',
    trade_no: data.trade_no,
    scene: API.Scene.Jsapi,
    payer: {
      type: 'wechat',
      appId: uni.getAccountInfoSync().miniProgram.appId,
      openId: 'oN-dc5aLPEp1QXw_ZdZtkfjlwjWI',

    },
    client: {
      type: API.Type.Applet,
      platform: API.Platform.Wechat,
    },
  }
}

function clickPay() {
  // 支付
  API.paying(getPaymentInfo()).then((response) => {
    if (response.status === 200) {
      if (response.data.data.payment_trigger.type === 'applet') {
        uni.requestPayment({
          provider: 'wxpay',
          ...response.data.data.payment_trigger.content, // 微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
          success(res) {
            console.log(`success:${JSON.stringify(res)}`)
          },
          fail(err) {
            console.log(`fail:${JSON.stringify(err)}`)
          },
        })
      }
      conosole.log(response.data)
    }
  })
}
onLoad((options) => {
  data.merchant_app_id = options.merchant_app_id
  data.trade_no = options.trade_no
  console.log(options)
  // 查询数据
  API.ready(getPaymentInfo())
})
</script>

<template>
  <view>
    <nut-button block type="primary" @click="clickPay">
      立即支付
    </nut-button>
  </view>
</template>

<style scoped>

</style>

<route lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "支付",
"enablePullDownRefresh":false
}
}
</route>
