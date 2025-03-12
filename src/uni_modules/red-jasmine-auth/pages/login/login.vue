<script setup lang="ts">
import login from '@/uni_modules/red-jasmine-auth/common/auth'
import { onShow } from '@dcloudio/uni-app'

onShow(() => {
  // #ifdef MP
  login.login()
  // #endif
})
</script>

<template>
  登录
</template>

<route  lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "登录",
"enablePullDownRefresh":false
}
}
</route>

<style scoped>

</style>
