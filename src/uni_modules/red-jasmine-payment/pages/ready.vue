<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import * as API from '../api/api'

const data = reactive({
  merchant_app_id: null,
  trade_no: null,
  trade: null,
  selectMethod: null, // 选中支付方式
})

// uni.getAccountInfoSync()?.miniProgram?.appId || null
function getPaymentInfo() {
  let scene = null
  const payer = {
    type: null, // 类型
    appId: null,
    openId: null,

  }
  const client = {
    type: null,
    platform: API.Platform.Other,
  }

  // 小程序平台
  // #ifdef MP
  // 获取当前应用的 信息
  scene = API.Scene.Jsapi

  console.log(uni.getSystemInfoSync().uniPlatform)
  console.log(uni.getAccountInfoSync())

  payer.appId = uni.getAccountInfoSync()?.miniProgram?.appId || null
  payer.openId = '' // 如何获取Open Id

  client.type = API.Type.Applet

  // #endif

  // #ifdef MP-WEIXIN
  client.platform = API.Platform.Wechat
  // #endif

  // #ifdef MP-ALIPAY
  client.platform = API.Platform.Alipay
  // #endif

  // #ifdef WEB
  payer.appId = null
  scene = API.Scene.Web
  client.type = API.Type.Web
  // #endif

  // #ifdef H5
  payer.appId = null
  scene = API.Scene.Wap
  client.type = API.Type.Wap
  // #endif

  return {
    merchant_app_id: data.merchant_app_id,
    method: data.selectMethod,
    trade_no: data.trade_no,
    scene,
    payer,
    client,
  }
}

function initTrade(trade) {
  data.trade = trade

  if (data.trade.methods.length > 0) {
    data.selectMethod = data.trade.methods[0].name
  }

  if (data.trade.methods.length === 1) {
    clickPay()
  }
}

onLoad((options) => {
  data.merchant_app_id = options.merchant_app_id
  data.trade_no = options.trade_no

  // 查询数据
  API.ready(getPaymentInfo()).then((response) => {
    console.log(response)
    initTrade(response.data.data)
  })
})

function clickPay() {
  // 发起支付
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
</script>

<template>
  <view v-if="data.trade">
    <nut-row class="mt-50">
      <nut-col :span="24" flex justify="center">
        <nut-price
          style="--nut-primary-color:black;--nut-price-big-size:2.0rem;--nut-price-symbol-big-size:2.0rem;--nut-price-decimal-big-size:2.0rem;"
          :price="data.trade.amount.value" symbol="¥" size="large"
        />
      </nut-col>
    </nut-row>
    <nut-form>
      <nut-form-item label="单号">
        <nut-input readonly :model-value="data.trade.trade_no" type="text" />
      </nut-form-item>
      <nut-form-item label="主题">
        <nut-input readonly :model-value="data.trade.subject" type="text" />
      </nut-form-item>

      <nut-row class="mt-30">
        <h2>支付方式</h2>
        <nut-grid class="mt-5" :column-num="3">
          <nut-grid-item
            v-for=" (method, index) in (data.trade.methods || [])"
            :key="method.code"
            class="border rounded-5 border-solid"
            :class="{
              'border-red': data.selectMethod === method.name,
            }" :text="method.name"
          >
            <nut-icon v-if="method.icon" :name="method.icon" />
          </nut-grid-item>
        </nut-grid>
      </nut-row>
    </nut-form>
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
