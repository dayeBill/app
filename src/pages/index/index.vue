<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive } from 'vue'

const formConfig = reactive({
  showAmount: true,
  loading: false,
  contact_id: false,
  bill_time: false,
  amount: true,
  subjectHelper: false,
})
const currentDate = ref<Date>(new Date(2022, 4, 10, 10, 10))
const formData = reactive({
  subject: null,
  bill_category: '人情礼金',
  bill_type: '',
  bill_time: dayjs().format('YYYY-MM'),
  amount: {
    currency: 'CNY',
    value: null,
  },
  payee_type: null,
  payee_id: null,
  pay_method: null,
  remarks: null,
  event_id: null,
  contact_id: null,
  contact: null,
  event: null,
  contact_name: null,
  event_name: null,

})
</script>

<template>
  <nut-form :model-value="formData">
    <nut-row>
      <nut-col :span="12" class="flex items-center justify-start">
        <!--        <nut-animate class="mt-5" type="flicker" :loop="true"> -->
        <!--          <nut-button type="primary"> -->
        <!--            数据统计 -->
        <!--          </nut-button> -->
        <!--        </nut-animate> -->

        <nut-form-item required>
          <nut-radio-group v-model="formData.bill_type" direction="horizontal">
            <nut-radio size="mini" label="" shape="button">
              全部
            </nut-radio>
            <nut-radio size="mini" label="income" shape="button">
              收入
            </nut-radio>
            <nut-radio size="mini" label="expense" shape="button">
              支出
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
      </nut-col>
      <nut-col :span="12">
        <nut-form-item required prop="bill_time" :rules="[{ required: true, message: '不能为空' }]">
          <nut-input
            v-model="formData.bill_time"
            readonly
            input-align="right"
            placeholder="请选择日期"
            @click="formConfig.bill_time = true"
          >
            <template #right>
              <nut-icon name="triangle-down" />
            </template>
          </nut-input>

          <nut-popup
            v-model:visible="formConfig.bill_time"
            position="bottom" safe-area-inset-bottom
          >
            <nut-date-picker
              v-model="currentDate"
              type="year-month"
              :min-date="new Date(1990, 0, 1)"
              is-show-chinese
              @confirm="({ selectedValue }) => { formData.bill_time = selectedValue.join('-');formConfig.bill_time = false }"
              @cancel="formConfig.bill_time = false"
            />
          </nut-popup>
        </nut-form-item>
      </nut-col>
    </nut-row>
  </nut-form>
  <nut-row>
    <nut-col :span="12">
      <div class="flex-content">
        <p class="text-center">
          <nut-price :price="0" size="large" :need-symbol="true" />
        </p>
        <p class="text-center">
          <span>收入</span>
        </p>
      </div>
    </nut-col>
    <nut-col :span="12">
      <div class="flex-content">
        <p class="text-center">
          <nut-price :price="0" size="large" :need-symbol="true" />
        </p>
        <p class="text-center">
          <span>支出</span>
        </p>
      </div>
    </nut-col>
  </nut-row>
</template>

<route lang="json">
{
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "首页"
}
}
</route>

<style scoped>
.logo {
  width: 100rpx;
  height: 100rpx;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  text-decoration: none;
}
</style>
