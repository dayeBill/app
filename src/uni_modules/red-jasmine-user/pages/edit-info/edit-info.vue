<!--
 * @Author: liushoukun liushoukun66@gmail.com
 * @Date: 2025-04-15 23:20:03
 * @LastEditors: liushoukun liushoukun66@gmail.com
 * @LastEditTime: 2025-04-15 23:38:25
 * @FilePath: \app\src\uni_modules\red-jasmine-user\pages\edit-info\edit-info.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import type { FormInst } from 'nutui-uniapp'
import { onLoad } from '@dcloudio/uni-app'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { getUserBaseInfo, updateBaseInfo } from '../../api/user'

// 初始化获取基础信息
async function initData() {
  try {
    const { data } = await getUserBaseInfo()
    formData.value = data
  }
  catch (e) {
    console.error(e)
  }
}

onLoad(() => {
  initData()
})

const form = ref<FormInst | null>(null)
const formData = ref({
  avatar: '',
  nickname: '',
  birthday: '',
  introduction: '',
  gender: null,
})

// 提交更新
const isLoading = ref(false)
const submitForm = debounce(async () => {
  if (form.value) {
    await form.value.validate()
  }
  try {
    isLoading.value = true
    await updateBaseInfo(formData.value)
    uni.showToast({ title: '更新成功' })
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isLoading.value = false
  }
})

// 图片base64转换及压缩处理
function beforeRead(file) {
  return new Promise((resolve, reject) => {
    // 创建一个canvas对象
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = file.path
    img.onload = () => {
      // 图片原始尺寸
      const originWidth = img.width
      const originHeight = img.height
      // 最大尺寸限制
      const maxWidth = 400
      const maxHeight = 400
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        }
        else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      ctx.clearRect(0, 0, targetWidth, targetHeight)
      // 图片绘制
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      canvas.toDataURL(file.type, 0.7, (base64) => {
        resolve(base64)
      }, (err) => {
        reject(err)
      })
    }
  })
}
</script>

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

<template>
  <view class="container">
    <nut-form ref="form" :model-value="formData">
      <!-- 头像上传 -->
      <nut-form-item label="头像" prop="avatar">
        <nut-uploader v-model="formData.avatar" :before-read="beforeRead" />
      </nut-form-item>

      <nut-form-item label="昵称" prop="nickname" required :rules="[{ required: true, message: '请输入昵称' }]">
        <nut-input v-model="formData.nickname" placeholder="请输入昵称" />
      </nut-form-item>

      <nut-form-item label="性别" prop="gender" required :rules="[{ required: true, message: '请选择性别' }]">
        <nut-radio-group v-model="formData.gender" direction="horizontal">
          <nut-radio :label="1">
            男
          </nut-radio>
          <nut-radio :label="2">
            女
          </nut-radio>
        </nut-radio-group>
      </nut-form-item>

      <nut-form-item label="生日">
        <nut-date-picker v-model="formData.birthday" />
      </nut-form-item>

      <nut-form-item label="个人简介">
        <nut-textarea v-model="formData.introduction" placeholder="请输入个人简介" rows="3" />
      </nut-form-item>

      <nut-button block type="primary" :loading="isLoading" @click="submitForm">
        提交
      </nut-button>
    </nut-form>
  </view>
</template>
