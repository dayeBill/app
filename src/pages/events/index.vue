<script lang="ts" setup>
import ListView from '@/components/ListView.vue'
</script>

<template>
  <HeaderWrapper />
  <ListView />
  <nut-cell title="我是标题" desc="描述文字" />
</template>

<route  lang="json">
{
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": "Home"
  }
}
</route>

<style scoped>

</style>
