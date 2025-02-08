<script lang="ts" setup>
import type { FormInst } from 'nutui-uniapp'
import { Bills as ResourceApi } from '@/api/bills'
import { getCurrentDateFormatted } from '@/utils/date'
import { onBackPress, onLoad } from '@dcloudio/uni-app'
import { useToast } from 'nutui-uniapp/composables'
import { defineEmits, reactive } from 'vue'

const emit = defineEmits(['success'])
const toast = useToast()

const formConfig = reactive({
  loading: false,

  contact_id: false,
  bill_time: false,
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
  bill_category: '人情礼金',
  bill_type: 'expense',
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
  contact_name: null,

})

const pageHelpers = reactive({
  categories: [],
  contacts: [],
})

onLoad(() => {
  uni.$on('list-view-select', (values) => {
    console.log('list-view-select', values)
    formData.contact_id = values[0].id
    formData.contact_name = values[0].name
    formData.contact = values[0]
  })
  new ResourceApi().options().then((response) => {
    pageHelpers.categories = response.data.data.categories
  })
})
onBackPress((options) => {
  console.log('onBackPress', options)
})

function toSelectContactsPage() {
  uni.navigateTo({
    url: '/pages/contacts/select',
  })
}
</script>

<template>
  <nut-form ref="form" :model-value="formData">
    <nut-form-item label="类型">
      <nut-radio-group v-model="formData.bill_type" direction="horizontal">
        <nut-radio label="income" shape="button">
          收入
        </nut-radio>
        <nut-radio label="expense" shape="button">
          支出
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item :rules="[{ required: true, message: '不能为空' }]" label="分类" prop="bill_category" required>
      <nut-radio-group v-model="formData.bill_category" direction="horizontal">
        <nut-radio
          v-for="(type) in pageHelpers.categories || []" :key="type.label" :label="type.label" shape="button"
          size="mini"
        >
          {{ type.label }}
        </nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="金额" prop="amount.value">
      <nut-input-number v-model="formData.amount.value" />
    </nut-form-item>
    <nut-form-item label="日期" required prop="bill_time" :rules="[{ required: true, message: '不能为空' }]">
      <nut-input
        v-model="formData.bill_time"
        readonly
        placeholder="请选择日期"
        @click="formConfig.bill_time = true"
      />
      <nut-calendar
        v-model:visible="formConfig.bill_time"
        :is-auto-back-fill="true"
        :default-value="getCurrentDateFormatted()"
        start-date="2000-01-01"
        @close="formConfig.bill_time = false"
        @choose="(date) => formData.bill_time = date[3]"
      />
    </nut-form-item>

    <nut-form-item label="联系人" prop="contact_id">
      <nut-input
        v-model="formData.contact_name"
        class="nut-input-text" placeholder="请选择联系人"
        readonly type="text" @click-input="toSelectContactsPage"
      >
        <template #right>
          <nut-button size="small">
            新建
          </nut-button>
        </template>
      </nut-input>
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
