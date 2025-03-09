<script lang="ts" setup>
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

    data.vip = response.data.data
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
  <view v-if="data.vip">
    <view class="min-h-4xl bg-blue" justify="center" type="flex">
      <nut-row :style="{ paddingTop: '40px' }" justify="center" type="flex">
        <nut-col :span="20">
          {{ data.vip.name }}
        </nut-col>
      </nut-row>
    </view>

    <view :style="{ marginTop: '-60px' }">
      <nut-row justify="center" type="flex">
        <nut-col :span="20">
          <nut-cell>
            <p>{{ data.vip.description }}</p>
          </nut-cell>
        </nut-col>
      </nut-row>
      <nut-row class="mt-0" justify="center" type="flex">
        <nut-col :span="20">
          <nut-grid>
            <nut-grid-item
              v-for="(privilege, index) in data.vip.extras.privileges || []"
              :key="index"
              :text="privilege.title"
            />
          </nut-grid>
        </nut-col>
      </nut-row>
    </view>
  </view>
  <nut-row class="mt-24">
    <nut-col :span="24">
      <view>
        <scroll-view class="w-full whitespace-nowrap" scroll-x="true" @scroll="scroll">
          <view
            v-for="(product, index) in data.products" :key="index"

            class="flex-content text-36rp mr-10 inline-block h-300 w-28/100 border-2 rounded-20 rounded-tr-60 border-solid text-center"
            :class="{
              'border-blue': selectProduct === product.id,
              'border-gray': selectProduct !== product.id,
              'bg-blue-100': selectProduct === product.id,
            }"
            @click="selectProduct = product.id"
          >
            <view>
              <p>{{ product.name }}</p>
              <p>
                <nut-price :price="product.price.value" />
              </p>
              <p> {{ product.time_value }} {{ product.time_unit_label }}</p>
            </view>
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

<route lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "VIP",
"enablePullDownRefresh":false
}
}
</route>
