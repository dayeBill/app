<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
// 获取当前VIP 信息
import { defineProps } from 'vue'
import * as API from '../api/api'

const props = defineProps({
  appId: {
    type: {
      type: String,
      default: '',
    },
  },
  type: {
    type: String,
    default: 'vip',
  },

})
const vip = ref({
  level: 0,
  is_expired: false,
  start_time: null,
  end_time: null,
})

onLoad(() => {
  API.userVip(props.appId, props.type).then((response) => {
    if (response.data.code === 0) {
      vip.value.level = response.data.data.level
      vip.value.is_expired = response.data.data.is_expired
      vip.value.start_time = response.data.data.start_time
      vip.value.end_time = response.data.data.end_time
    }
  })
})

function clickOpenButton() {
  uni.navigateTo({
    url: `/uni_modules/red-jasmine-vip/pages/index?app_id=${props.appId}&type=${props.type}`,
  })
}
</script>

<template>
  <nut-cell round-radius="5">
    <template #icon />
    <template v-if="vip.is_expired" #title>
      <p>VIP会员</p>
      <p>开通享受特权</p>
    </template>
    <template v-if="vip.is_expired === false" #title>
      <span class="pr-30 text-red-5 font-bold">VIP</span>
      <span class="text-amber">{{ vip.level }}</span>
    </template>
    <template v-if="vip.is_expired" #desc>
      <nut-button type="primary" @click="clickOpenButton">
        立即开通
      </nut-button>
    </template>
  </nut-cell>
</template>

<style scoped>

</style>
