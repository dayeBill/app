<!--
 * @Author: liushoukun liushoukun66@gmail.com
 * @Date: 2025-02-07 10:02:20
 * @LastEditors: liushoukun liushoukun66@gmail.com
 * @LastEditTime: 2025-02-07 11:43:18
 * @FilePath: \app\src\pages\my\user-base-info.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted } from 'vue'
// 假设有一个获取用户信息的API

onMounted(() => {

})
</script>

<template>
  <HeaderWrapper title="测试" />
  <nut-form>
    <nut-form-item label="头像">
      <nut-input readonly>
        <template #right>
          <nut-avatar shape="square" size="small" class="mx-auto">
            <nut-icon name="my" />
          </nut-avatar>
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="昵称">
      <nut-input class="nut-input-text" placeholder="请输入昵称" type="nickname" />
    </nut-form-item>
  </nut-form>
</template>

<route lang="json">
{
"layout": "base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "个人资料"
}
}
</route>

<style scoped>

</style>
