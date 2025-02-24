<script lang="ts" setup>
import type { FormInst } from 'nutui-uniapp'
import { Bills as ResourceApi } from '@/api/bills'

import { getCurrentDateFormatted } from '@/utils/date'
import { onBackPress, onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { useToast } from 'nutui-uniapp/composables'
import { defineEmits, reactive } from 'vue'
// 引入 dayjs
const emit = defineEmits(['success'])
const toast = useToast()

const API = new ResourceApi()

const formConfig = reactive({
  showAmount: true,
  loading: false,
  contact_id: false,
  bill_time: false,
  amount: true,
  subjectHelper: false,
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
  subject: null,
  bill_category: '人情礼金',
  bill_type: 'expense',
  bill_time: dayjs().format('YYYY-MM-DD'),
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
  event: null,
  contact_name: null,
  event_name: null,

})

const pageHelpers = reactive({
  categories: [],
  contacts: [],
})

const multipleColumns = ref([
  [
    { text: '本人', value: '本人' },
    { text: '儿子', value: '儿子' },
    { text: '女儿', value: '女儿' },
    { text: '父亲', value: '父亲' },
    { text: '母亲', value: '母亲' },
  ],
  [
    { text: '结婚', value: '结婚' },
    { text: '升学', value: '升学' },
    { text: '生日', value: '生日' },
    { text: '丧宴', value: '丧宴' },
  ],
])

onLoad(() => {
  uni.$on('list-view-select:contacts', (values) => {
    console.log('list-view-select:', values)
    formData.contact_id = values[0].id
    formData.contact_name = values[0].name
    formData.contact = values[0]
  })
  uni.$on('list-view-select:events', (values) => {
    console.log('list-view-select:', values)
    formData.event_id = values[0].id
    formData.event_name = values[0].subject
    formData.event = values[0]
  })

  new ResourceApi().enums().then((response) => {
    pageHelpers.categories = response.data.data.categories
  })
})
onBackPress((options) => {
  console.log('onBackPress', options)
})

function toSelectEventsPage() {
  uni.navigateTo({
    url: '/pages/events/select',
  })
}

function toSelectContactsPage() {
  uni.navigateTo({
    url: '/pages/contacts/select',
  })
}

const amount = ref('')
function inputAmount(options) {
  console.log(options)
  console.log(amount.value)
}
</script>

<template>
  <nut-form v-if="false" ref="form" :model-value="formData">
    <nut-row>
      <nut-col :span="12">
        <nut-form-item required>
          <nut-radio-group v-model="formData.bill_type" direction="horizontal">
            <nut-radio size="mini" label="income" shape="button">
              收入
            </nut-radio>
            <nut-radio size="mini" label="expense" shape="button">
              支出
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
      </nut-col>
      <nut-col :span="12">
        <nut-form-item required prop="bill_time" :rules="[{ required: true, message: '不能为空' }]">
          <nut-input
            v-model="formData.bill_time"
            readonly
            input-align="right"
            placeholder="请选择日期"
            @click="formConfig.bill_time = true"
          >
            <template #right>
              <nut-icon name="triangle-down" />
            </template>
          </nut-input>
          <nut-calendar
            v-model:visible="formConfig.bill_time"
            :is-auto-back-fill="true"
            :default-value="formData.bill_time"
            start-date="2000-01-01"
            @close="formConfig.bill_time = false"
            @choose="(date) => formData.bill_time = date[3]"
          />
        </nut-form-item>
      </nut-col>
    </nut-row>
    <nut-form-item label="金额" prop="amount.value" required>
      <nut-input
        v-model="amount"
        type="number"
        placeholder="请输入数字"
      />
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
    <nut-form-item label="联系人" prop="contact_id">
      <nut-input
        v-model="formData.contact_name"
        class="nut-input-text" placeholder="请选择联系人"
        readonly type="text" @click-input="toSelectContactsPage"
      >
        <template #right>
          <nut-icon
            v-if="formData.contact_id" name="circle-close"
            @click="formData.contact_id = null;formData.contact_name = null;formData.contact = null"
          />
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="主题" prop="subject">
      <nut-input
        v-model="formData.subject" class="nut-input-text"
        clearable
        placeholder="请直接输入名称,【快捷选择】->" type="text"
      >
        <template #right>
          <nut-icon name="category" @click="formConfig.subjectHelper = true" />
        </template>
      </nut-input>
      <nut-popup v-model:visible="formConfig.subjectHelper " position="bottom" safe-area-inset-bottom>
        <nut-picker
          :columns="multipleColumns"
          title="人情账本主题"
          @cancel="formConfig.subjectHelper = false"
          @confirm="({ selectedValue, selectedOptions }) => {
            formData.subject = selectedValue.join('');console.log(selectedValue, selectedOptions);formConfig.subjectHelper = false
          }"
        />
      </nut-popup>
    </nut-form-item>
    <nut-form-item label="礼簿" prop="event_id">
      <nut-input
        v-model="formData.event_name"
        class="nut-input-text" placeholder="选择礼簿"
        readonly type="text" @click-input="toSelectEventsPage"
      >
        <template #right>
          <nut-icon
            v-if="formData.event_id" name="circle-close"
            @click="formData.event_name = null;formData.event_id = null;formData.event = null"
          />
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="备注" prop="remarks">
      <nut-textarea
        v-model="formData.remarks"

        show-word-limit limit-show
        max-length="50"
        class="nut-input-text" placeholder="填写备注" type="text"
      />
    </nut-form-item>
    <nut-number-keyboard
      v-model:visible="formConfig.amount"
      v-model="amount"
      maxlength="14"
      type="rightColumn"
      :custom-key="['.']"
      confirm-text="确定"
      @input="inputAmount"
    />
  </nut-form>

  <nut-form ref="form" :model-value="formData">
    <nut-row>
      <nut-col :span="12">
        <nut-form-item required>
          <nut-radio-group v-model="formData.bill_type" direction="horizontal">
            <nut-radio size="mini" label="income" shape="button">
              收入
            </nut-radio>
            <nut-radio size="mini" label="expense" shape="button">
              支出
            </nut-radio>
          </nut-radio-group>
        </nut-form-item>
      </nut-col>
      <nut-col :span="12">
        <nut-form-item required prop="bill_time" :rules="[{ required: true, message: '不能为空' }]">
          <nut-input
            v-model="formData.bill_time"
            readonly
            input-align="right"
            placeholder="请选择日期"
            @click="formConfig.bill_time = true"
          >
            <template #right>
              <nut-icon name="triangle-down" />
            </template>
          </nut-input>
          <nut-calendar
            v-model:visible="formConfig.bill_time"
            :is-auto-back-fill="true"
            :default-value="getCurrentDateFormatted()"
            start-date="2000-01-01"
            @close="formConfig.bill_time = false"
            @choose="(date) => formData.bill_time = date[3]"
          />
        </nut-form-item>
      </nut-col>
    </nut-row>
    <nut-form-item label="金额" prop="amount.value" required>
      <nut-input-number v-model="formData.amount.value" input-width="100" min="0" step="100" max="100000000" />
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

    <nut-form-item label="联系人" prop="contact_id">
      <nut-input
        v-model="formData.contact_name"
        class="nut-input-text" placeholder="请选择联系人"
        readonly type="text" @click-input="toSelectContactsPage"
      >
        <template #right>
          <nut-icon
            v-if="formData.contact_id" name="circle-close"
            @click="formData.contact_id = null;formData.contact_name = null;formData.contact = null"
          />
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="主题" prop="subject">
      <nut-input
        v-model="formData.subject" class="nut-input-text"
        clearable
        placeholder="请直接输入名称,【快捷选择】->" type="text"
      >
        <template #right>
          <nut-icon name="category" @click="formConfig.subjectHelper = true" />
        </template>
      </nut-input>
      <nut-popup v-model:visible="formConfig.subjectHelper " position="bottom" safe-area-inset-bottom>
        <nut-picker
          :columns="multipleColumns"
          title="人情账本主题"
          @cancel="formConfig.subjectHelper = false"
          @confirm="({ selectedValue, selectedOptions }) => {
            formData.subject = selectedValue.join('');console.log(selectedValue, selectedOptions);formConfig.subjectHelper = false
          }"
        />
      </nut-popup>
    </nut-form-item>
    <nut-form-item label="礼簿" prop="event_id">
      <nut-input
        v-model="formData.event_name"
        class="nut-input-text" placeholder="选择礼簿"
        readonly type="text" @click-input="toSelectEventsPage"
      >
        <template #right>
          <nut-icon
            v-if="formData.event_id" name="circle-close"
            @click="formData.event_name = null;formData.event_id = null;formData.event = null"
          />
        </template>
      </nut-input>
    </nut-form-item>
    <nut-form-item label="备注" prop="remarks">
      <nut-textarea
        v-model="formData.remarks"

        show-word-limit limit-show
        max-length="50"
        class="nut-input-text" placeholder="填写备注" type="text"
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
"navigationBarTitleText": "添加账单"
}
}
</route>

<style scoped>

</style>
