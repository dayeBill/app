<script lang="ts" setup>
import login from '@/uni_modules/red-jasmine-auth/common/auth'
import { onShow } from '@dcloudio/uni-app'

const data = reactive({
  loading: false,
})
onShow(() => {
  console.log('login-onShow')
  // #ifdef MP
  data.loading = true
  login.login()
  // #endif
})
</script>

<template>
  <nut-loading-page
    :loading="data.loading"
    loading-text="正在登录中"
    image="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
  />
</template>

<route lang="json">
{
"auth":false,
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
