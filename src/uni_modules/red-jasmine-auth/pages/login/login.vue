<script lang="ts" setup>
import login from '@/uni_modules/red-jasmine-auth/common/auth'
import {onShow} from '@dcloudio/uni-app'
import {useAuthStore} from '../../store/auth'
import {password} from './../../api/login'

const auth = useAuthStore()

const data = reactive({
  loading: false,
  form: {
    account: '',
    password: '',
  },
})
onShow(() => {
  console.log('login-onShow')
  // #ifdef MP
  data.loading = true
  login.login()
  // #endif
})

async function handlePasswordLogin() {
  if (!data.form.account || !data.form.password) {
    return uni.showToast({
      title: '请输入账号和密码',
      icon: 'none',
    })
  }
  data.loading = true

  try {
    const loginResponse = await password(data.form)
    data.loading = false

    auth.setToken(loginResponse?.data?.data?.access_token)
  } catch (error) {
    data.loading = false
    console.log(error)
  }
}
</script>

<template>
  <div>
    <nut-form>
      <nut-form-item label="账号">
        <nut-input v-model="data.form.account" placeholder="请输入账号"/>
      </nut-form-item>
      <nut-form-item label="密码">
        <nut-input
            v-model="data.form.password"
            type="password"
            placeholder="请输入密码"
        />
      </nut-form-item>

      <nut-cell>
        <nut-button
            type="primary"
            block
            :loading="data.loading"
            @click="handlePasswordLogin"
        >
          登录
        </nut-button>
      </nut-cell>
    </nut-form>

    <nut-loading-page
        :loading="data.loading"
        loading-text="正在登录中"
        image="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
    />
  </div>
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
