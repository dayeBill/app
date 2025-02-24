<script lang="ts" setup>
import vip from '@/packages/vip/pages/index.vue'
</script>

<template>
  <vip />
</template>

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

<style scoped>
.logo {
  width: 100rpx;
  height: 100rpx;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  text-decoration: none;
}
</style>
