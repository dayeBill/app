<script setup lang="ts">

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
"style": {
"navigationStyle": "custom",
"navigationBarTitleText": "个人资料"
}
}
</route>

<style scoped>

</style>
