<script setup lang="ts">
import type { FormInst } from 'nutui-uniapp'
import { Contacts as ResourceApi } from '@/api/contacts'
import { onLoad } from '@dcloudio/uni-app'
import { useToast } from 'nutui-uniapp/composables'
import { defineEmits, reactive } from 'vue'

const emit = defineEmits(['success'])
const toast = useToast()

const formConfig = reactive({
  loading: false,
  event_date: false,
})

function validate(item: any) {
  console.log(item)
}

const form = ref<FormInst | null>(null)
const API = new ResourceApi()
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
  relation_type: null,
  name: null,
  phone_number: null,
  remarks: null,

})
interface selectOption {
  label: string
  value: string
  icon?: string | null
}
const pageHelpers = reactive({
  relationTypes: [],
})

onLoad(() => {
  API.enums().then((response) => {
    pageHelpers.relationTypes = response.data.data.relationTypes
  })
})
</script>

<template>
  <nut-form ref="form" :model-value="formData">
    <nut-form-item label="关系" required prop="relation_type" :rules="[{ required: true, message: '不能为空' }]">
      <nut-radio-group v-model="formData.relation_type" direction="horizontal">
        <nut-radio v-for="(type) in pageHelpers.relationTypes || []" :key="type.value" shape="button" :label="type.label" size="mini">
          {{ type.label }}
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="名称" required prop="name" :rules="[{ required: true, message: '不能为空' }]">
      <nut-input v-model="formData.name" class="nut-input-text" placeholder="请输入名称" type="text" />
    </nut-form-item>
    <nut-form-item label="电话" prop="phone_number">
      <nut-input v-model="formData.phone_number" class="nut-input-text" placeholder="请输入名称" type="text" />
    </nut-form-item>
    <nut-form-item label="备注" prop="remarks">
      <nut-input v-model="formData.remarks" class="nut-input-text" placeholder="请输入名称" type="text" />
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
"navigationBarTitleText": "添加联系人"
}
}
</route>

<style scoped>

</style>
