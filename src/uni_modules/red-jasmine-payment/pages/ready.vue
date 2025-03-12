<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import * as API from '../api/api'
import { getPaymentEnvironment } from '../utils/payment'

interface Amount {
  value: number
  currency: string
}

interface Method {
  code: string
  name: string
  icon: string | null
}

interface Trade {
  trade_no: string
  subject: string
  methods: Method[]
  amount: Amount

  [property: string]: any

}

const authCode = ref('')
const data = reactive({
  init: false,
  merchant_app_id: null,
  trade_no: null,
  trade: null,
  selectMethod: null, // 选中支付方式
  payer: null,
})

function getTradeRequest(): API.TradeRequest {
  const request = getPaymentEnvironment()

  request.merchant_app_id = data.merchant_app_id
  request.trade_no = data.trade_no
  request.method = data.selectMethod

  request.payer = data.payer

  return request
}

function getPayerInfoRequest(): API.PayerRequest {
  const request = getPaymentEnvironment()
  request.merchant_app_id = data.merchant_app_id
  const accountInfo = uni.getAccountInfoSync()
  const appId = accountInfo.miniProgram.appId

  request.channel_app_id = appId
  request.code = authCode.value
  return request
}

async function initPayer() {
  // 小程序获取 CODE
  try {
    // 缓存获取 TODO
    const res = await uni.getProvider({ service: 'oauth' })
    const provider = res.provider[0]

    const loginResult = await uni.login({ provider })
    authCode.value = loginResult.code
    console.log('小程序登录成功', loginResult.code)
    console.log('支付人信息', getPayerInfoRequest())

    try {
      const response = await API.payerInfo(getPayerInfoRequest())
      console.log('支付人信息', response)
      data.payer = response.data.data
    }
    catch (error) {
      console.error('获取微信授权失败', error)
    }
  }
  catch (error) {
    console.error('小程序登录失败', error)
  }
}

function initTrade(trade: Trade) {
  data.trade = trade

  if (trade.methods.length > 0) {
    data.selectMethod = trade.methods[0].code
  }

  if (trade.methods.length === 1) {
    // clickPay()
  }

  data.init = true
}

onLoad(async (options) => {
  data.merchant_app_id = options.merchant_app_id
  data.trade_no = options.trade_no

  // 获取支付人信息

  await initPayer()

  // 查询数据
  API.ready(getTradeRequest()).then((response) => {
    console.log(response)
    initTrade(response.data.data)
  })
})

function clickPay() {
  // 发起支付
  API.paying(getTradeRequest()).then((response) => {
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
  <nut-loading-page :loading="!data.init" />
  <view v-if="data.trade" class="pl-10 pr-10">
    <nut-row class="mt-50">
      <nut-col :span="24" flex justify="center">
        <nut-price
          :price="data.trade.amount.value"
          size="large"
          style="--nut-primary-color:black;--nut-price-big-size:2.0rem;--nut-price-symbol-big-size:2.0rem;--nut-price-decimal-big-size:2.0rem;"
          symbol="¥"
        />
      </nut-col>
    </nut-row>
    <nut-form>
      <nut-form-item label="单号">
        <nut-input :model-value="data.trade.trade_no" readonly type="text" />
      </nut-form-item>
      <nut-form-item label="标题">
        <nut-input :model-value="data.trade.subject" readonly type="text" />
      </nut-form-item>

      <nut-row class="mt-30">
        <h2>支付方式</h2>
        <nut-grid :column-num="3" class="mt-5">
          <nut-grid-item
            v-for=" (method, index) in (data.trade.methods || [])"
            :key="method.code"
            :class="{
              'border-black': data.selectMethod === method.code,
            }"
            :index="index"
            :text="method.name" class="border border-1 border-solid"
          >
            <image :src="`../static/methods/${method.code}.png`" class="h-80 w-80" />
            <!--            <nut-icon :name="`../static/methods/${method.code}.png`" /> -->
          </nut-grid-item>
        </nut-grid>
      </nut-row>

      <nut-form-item class="mt-30">
        <nut-button block type="primary" @click="clickPay">
          立即支付
        </nut-button>
      </nut-form-item>
    </nut-form>
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
