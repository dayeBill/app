<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import qs from 'qs'
import { reactive } from 'vue'
import * as API from '../api/api'

const query = reactive({
  app_id: null,
  type: null,
})
const data = reactive({
  products: [],
  vip: null,
})
const selectProduct = ref(null)

onLoad((options) => {
  console.log(options)
  query.app_id = options.app_id
  query.type = options.type

  // 查询 会员
  API.vipDetail(query.app_id, query.type).then((response) => {
    console.log('VIP', response)
  })

  API.products(query.app_id, query.type).then((response) => {
    console.log(response)

    data.products = response.data.data
  })
})

function clickBuyButton() {
  API.buy({
    id: selectProduct.value,
    quantity: 1,
  }).then((response) => {
    // 调用支付单 TODO

    if (response.status === 200) {
      const queryString = qs.stringify({
        merchant_app_id: response.data.data.merchant_app_id,
        trade_no: response.data.data.trade_no,
      })

      uni.navigateTo({
        url: `/uni_modules/red-jasmine-payment/pages/ready?${queryString}`,
      })
    }

    console.log(response)
  })
}
</script>

<template>
  <nut-row class="min-h-5xl bg-blue">
    <nut-col :span="24">
      <div class="flex-content">
        span:24
      </div>
    </nut-col>
  </nut-row>
  <nut-row :style="{ marginTop: '-20px' }" type="flex" justify="center">
    <nut-col :span="20">
      <nut-grid>
        <nut-grid-item text="文字">
          <nut-icon name="dongdong" />
        </nut-grid-item>
        <nut-grid-item text="文字">
          <nut-icon name="dongdong" />
        </nut-grid-item>
        <nut-grid-item text="文字">
          <nut-icon name="dongdong" />
        </nut-grid-item>
        <nut-grid-item text="文字">
          <nut-icon name="dongdong" />
        </nut-grid-item>
      </nut-grid>
    </nut-col>
  </nut-row>
  <nut-row class="mt-24">
    <nut-col :span="24">
      <view>
        <scroll-view class="w-full whitespace-nowrap" scroll-x="true" @scroll="scroll">
          <view
            v-for="(product, index) in data.products" :key="index"
            class="flex-content text-36rp mr-10 inline-block h-300 w-30/100 border-2 border-gray border-solid text-center"
            @click="selectProduct = product.id"
          >
            <p>{{ product.name }}</p>
            <p>
              <nut-price :price="product.price.value" />
            </p>
            <p> {{ product.time_value }} {{ product.time_unit_label }}</p>
          </view>
        </scroll-view>
      </view>
    </nut-col>
    <nut-col class="mt-20">
      <nut-button block type="primary" @click="clickBuyButton">
        确定并支付
      </nut-button>
    </nut-col>
  </nut-row>
</template>

<style scoped>
.scroll-view-item_H {
  display: inline-block;
  width: 90%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>

<route  lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "VIP",
"enablePullDownRefresh":false
}
}
</route>
