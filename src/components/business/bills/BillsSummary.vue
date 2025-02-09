<script setup lang="ts">
import { Bills } from '@/api/bills'
import { onLoad } from '@dcloudio/uni-app'
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
  bill_type: '',
  month: dayjs().format('YYYY-MM'),
})

const queryConfig = reactive({
  loading: false,
})

const summary = reactive({
  income: 0,
  expense: 0,
})

const API = new Bills()

function init() {
  if (queryConfig.loading === true) {
    return
  }
  queryConfig.loading = true
  API.summary(formData).then((response) => {
    summary.income = response.data?.data?.income || 0
    summary.expense = response.data?.data?.expense || 0
  }).finally(() => {
    queryConfig.loading = false
  })
}

onLoad(() => {
  init()
})
</script>

<template>
  <view>
    <nut-row>
      <nut-col :span="12" class="flex items-center justify-center">
        <!--        <nut-animate class="mt-5" type="flicker" :loop="true"> -->
        <!--          <nut-button type="primary"> -->
        <!--            数据统计 -->
        <!--          </nut-button> -->
        <!--        </nut-animate> -->

        <nut-radio-group v-model="formData.bill_type" direction="horizontal" @change="init">
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
      </nut-col>
      <nut-col span="12" class="flex items-center justify-center">
        <span>{{ formData.month }}</span><nut-icon name="triangle-down" @click="formConfig.bill_time = true" />

        <nut-popup
          v-model:visible="formConfig.bill_time"
          position="bottom" safe-area-inset-bottom
        >
          <nut-date-picker
            v-model="currentDate"
            type="year-month"
            :min-date="new Date(1990, 0, 1)"
            is-show-chinese
            @confirm="({ selectedValue }) => { formData.month = selectedValue.join('-');formConfig.bill_time = false;init() }"
            @cancel="formConfig.bill_time = false"
          />
        </nut-popup>
      </nut-col>
    </nut-row>
    <nut-row class="mt-30 pb-10" :loading="queryConfig.loading">
      <nut-col :span="12">
        <div class="flex-content">
          <p class="text-center">
            <nut-price style="color: #4cd964" :price="summary.income" size="large" :need-symbol="true" />
          </p>
          <p class="text-center">
            <span class="text-gray-600">收入</span>
          </p>
        </div>
      </nut-col>
      <nut-col :span="12">
        <div class="flex-content">
          <p class="text-center">
            <nut-price :price="summary.expense" size="large" :need-symbol="true" />
          </p>
          <p class="text-center">
            <span class="text-gray-600">支出</span>
          </p>
        </div>
      </nut-col>
    </nut-row>
  </view>
</template>

<style scoped>

</style>
