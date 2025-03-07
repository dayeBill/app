<script lang="ts" setup>
import { getUserInfo } from '@/api/user'
// 假设有一个获取用户信息的API
import { onMounted, ref } from 'vue'
// 定义用户信息的响应式变量
const userInfo = ref({
  nickname: '请登录',
  username: '',
  avatar: null,
})

// 在组件挂载时获取用户信息
onMounted(async () => {
  try {
    const response = await getUserInfo()

    userInfo.value = response.data.data
  }
  catch (error) {
    console.error('获取用户信息失败', error)
  }
})
</script>

<template>
  <nut-cell-group>
    <nut-cell title="个人信息" is-link icon="setting" />
    <nut-cell title="账号安全" is-link icon="setting" />
  </nut-cell-group>
  <nut-cell-group>
    <nut-cell title="隐私设置" is-link icon="setting" />
    <nut-cell title="个人信息与权限" is-link icon="setting" />
    <nut-cell title="个人信息收集清单" is-link icon="setting" />
    <nut-cell title="第三方信息共享清单" is-link icon="setting" />
  </nut-cell-group>
  <nut-cell-group>
    <nut-cell title="关于" is-link icon="setting" />
    <nut-cell title="帮助与反馈" is-link icon="setting" />
  </nut-cell-group>

  <nut-cell title="退出登录" is-link icon="setting" />
</template>

<route lang="json">
{
"middleware": ["auth"],
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "设置"
}
}
</route>

<style scoped>

</style>
