<script lang="ts" setup>
import BillsSummary from '@/components/business/bills/BillsSummary.vue'
</script>

<template>
  <view class="pt-100">
    <BillsSummary />
  </view>
</template>

<route lang="json">
{
"auth":true,
"middleware": ["auth"],
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "统计"
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
