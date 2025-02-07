<script setup lang="ts">
import type { FormInst } from 'nutui-uniapp'
import { Bills as ResourceApi } from '@/api/bills'
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

function submit() {
  form.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      if (formConfig.loading === true)
        return
      formConfig.loading = true

      new ResourceApi().create(formData).then((response) => {
        emit('success', response.data.data)
        toast.success('创建成功', {
          duration: 1000,
          onClosed: () => {
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
  subject: null,
  bill_category: null,
  bill_type: null,
  bill_time: null,
  amount: {
    currency: 'CNY',
    value: null,
  },
  payee_type: null,
  payee_id: null,
  pay_method: null,
  remarks: null,
  event_id: null,
  contact_id: null,
  contact: null,

})

const pageHelpers = reactive({
  categories: [],
})

onLoad(() => {
  new ResourceApi().options().then((response) => {
    pageHelpers.categories = response.data.data.categories
  })
})
</script>

<template>
  <nut-form ref="form" :model-value="formData">
    <nut-form-item label="分类" required prop="bill_category" :rules="[{ required: true, message: '不能为空' }]">
      <nut-radio-group v-model="formData.relation_type" direction="horizontal">
        <nut-radio
          v-for="(type) in pageHelpers.categories || []" :key="type.label" shape="button" :label="type.label"
          size="mini"
        >
          {{ type.label }}
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="金额" prop="amount.value">
      <nut-input-number v-model="formData.amount.value" />
    </nut-form-item>
    <nut-form-item label="联系人" prop="name">
      <nut-input v-model="formData.name" class="nut-input-text" placeholder="请输入名称" type="text" />
    </nut-form-item>
    <nut-form-item label="主题" prop="subject">
      <nut-input v-model="formData.subject" class="nut-input-text" placeholder="请输入名称" type="text" />
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
"navigationBarTitleText": "添加账单"
}
}
</route>

<style scoped>

</style>
