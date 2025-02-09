<script setup lang="ts">
import type { FormInst } from 'nutui-uniapp'
import { Events } from '@/api/events'
import { getCurrentDateFormatted } from '@/utils/date'

import { onLoad } from '@dcloudio/uni-app'
import { useToast } from 'nutui-uniapp/composables'
import { defineEmits, reactive } from 'vue'

const emit = defineEmits(['success'])
const toast = useToast()
const API = new Events()
const formConfig = reactive({
  loading: false,
  event_date: false,
})

function validate(item: any) {
  console.log(item)
}

const form = ref<FormInst | null>(null)

function submit() {
  form.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      if (formConfig.loading === true)
        return
      formConfig.loading = true

      API.create(formData).then((response) => {
        emit('success', response.data.data)
        toast.success('创建成功', {
          duration: 1000,
          onClosed: () => {
            uni.$emit(`${API.name}:create:success`)
            uni.navigateBack({
              delta: 1,
            })
          },
        })
      }).catch((error) => {
        // TODO 设置表单错误
        toast.error('创建失败')
        console.log('11111', error.response)
      }).finally(() => {
        formConfig.loading = false
      })
    }
    else {
      console.log('error submit!!', errors)
    }
  })
}

function reset() {
  form.value?.reset()
}

const formData = reactive({
  type: null,
  subject: null,
  event_date: null,

})
interface seleteOption {
  label: string
  value: string
  icon?: string | null
}
const pageHelpers = reactive({
  eventTypes: [],
})

onLoad(() => {
  new Events().options().then((response) => {
    pageHelpers.eventTypes = response.data.data.eventTypes
  })
})
</script>

<template>
  <nut-form ref="form" :model-value="formData">
    <nut-form-item label="类型" required prop="type" :rules="[{ required: true, message: '不能为空' }]">
      <nut-radio-group v-model="formData.type" direction="horizontal">
        <nut-radio v-for="(type) in pageHelpers.eventTypes" :key="type.value" shape="button" :label="type.value" size="mini">
          {{ type.label }}
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="名称" required prop="subject" :rules="[{ required: true, message: '不能为空' }]">
      <nut-input v-model="formData.subject" class="nut-input-text" placeholder="请输入名称" type="text" />
    </nut-form-item>
    <nut-form-item label="日期" required prop="event_date" :rules="[{ required: true, message: '不能为空' }]">
      <nut-input
        v-model="formData.event_date"
        readonly
        placeholder="请选择日期"
        @click="formConfig.event_date = true"
      />
      <nut-calendar
        v-model:visible="formConfig.event_date"
        :is-auto-back-fill="true"
        :default-value="getCurrentDateFormatted()"
        start-date="1970-01-01"
        @close="formConfig.event_date = false"
        @choose="(date) => formData.event_date = date[3]"
      />
    </nut-form-item>

    <nut-cell>
      <nut-button
        :loading="formConfig.loading"
        block
        type="primary"
        @click="submit"
      >
        提交
      </nut-button>
    </nut-cell>
  </nut-form>
</template>

<route lang="json">
{
"layout":"base",
"style": {
"navigationStyle": "default",
"navigationBarTitleText": "事件"
}
}
</route>

<style scoped>

</style>
