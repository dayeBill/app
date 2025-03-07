<script lang="ts" setup>
import { getUserInfo } from '@/api/user'
import vip from '@/uni_modules/red-jasmine-vip/components/vip.vue' // 假设有一个获取用户信息的API
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
  <nut-row>
    <div>
      <nut-col :span="6">
        <div class="flex justify-center">
          <nut-avatar shape="square" size="large" class="mx-auto">
            <nut-icon v-if="!userInfo.avatar" name="my" />
            <image v-if="userInfo.avatar" :src="userInfo.avatar" />
          </nut-avatar>
        </div>
      </nut-col>
      <nut-col :span="16">
        <div>
          <h4>{{ userInfo.nickname }}</h4>
        </div>
        <div>
          <p>{{ userInfo.username }}</p>
        </div>
      </nut-col>
    </div>
    <nut-col :span="2">
      <div class="flex justify-center">
        <nut-icon name="setting" />
      </div>
    </nut-col>
  </nut-row>
  <nut-grid v-if="false" class="mt-50" :border="false">
    <nut-grid-item text="我的收藏">
      0
    </nut-grid-item>
    <nut-grid-item text="流量历史">
      0
    </nut-grid-item>
    <nut-grid-item text="我的关注">
      0
    </nut-grid-item>
    <nut-grid-item text="红包卡券">
      100
    </nut-grid-item>
  </nut-grid>
  <vip type="vip" app-id="bill" />
  <nut-cell class="nut-grid-cel tools-view">
    <nut-grid :border="false">
      <nut-grid-item text="共享记账">
        <image src="/static/images/tools/sync.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
      <nut-grid-item text="会员">
        <image src="/static/images/tools/vip.png" style="width: 40px;height: 40px" />
      </nut-grid-item>

      <nut-grid-item text="导入">
        <image src="/static/images/tools/upload.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
      <nut-grid-item text="导出">
        <image src="/static/images/tools/download.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
      <nut-grid-item text="统计">
        <image src="/static/images/tools/counts.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
      <nut-grid-item text="账户安全">
        <image src="/static/images/tools/security.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
      <nut-grid-item text="设置">
        <image src="/static/images/tools/setting.png" style="width: 40px;height: 40px" />
      </nut-grid-item>
    </nut-grid>
  </nut-cell>
  <nut-cell v-if="false" title="设置" is-link icon="setting" to="/uni_modules/red-jasmine-user/pages/setting/index" />
</template>

<route lang="json">
{
"middleware": ["auth"],
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "我的"
}
}
</route>

<style scoped>

</style>
