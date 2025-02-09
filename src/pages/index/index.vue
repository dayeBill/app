<script lang="ts" setup>
import BillsSummary from '@/components/business/bills/BillsSummary.vue'
</script>

<template>
  <HeaderWrapper>
    <div class="mx-auto h-full flex items-center justify-center">
      统计
    </div>
  </HeaderWrapper>
  <view class="summary pt-100">
    <BillsSummary />
  </view>
</template>

<route lang="json">
{
"style": {
"navigationStyle": "custom",
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
