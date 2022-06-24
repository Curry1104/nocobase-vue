<script setup lang="ts">
import { inject, onMounted, ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { FormSymbol, createSchemaField, RecursionField, SchemaOptionsSymbol, SchemaExpressionScopeSymbol, useForm } from '@formily/vue'
import SchemaComponent from '../../components/SchemaComponent/SchemaComponent.vue'

const components = inject('components')
const api = inject('api')
const form = inject(FormSymbol);
const router = useRouter()
const useSignin = () => {
  const { input : email, password} = form?.value.values
  api.signIn('users:signin', {
    email,
    password
  }).then(()=>router.push('/admin'))
};

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-decorator': 'Form.Item',
      'x-decorator-props': {
        label: '账号'
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
      },
    },
    password: {
      type: 'string',
      'x-decorator': 'Form.Item',
      'x-decorator-props': {
        label: '密码'
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
        type: 'password'
      },
    },
    submit: {
      type: 'void',
      'x-component': 'Action',
      'x-component-props': {
        htmlType: 'submit',
        block: true,
        type: 'primary',
        useAction: '{{ useSignin }}',
        style: { width: '100%' },
        content: '登录'
      },
    }
  },
}

const provider = {
  components,
  scope: {
    useSignin
  }
}

</script>

<template>
  <div class="login">
    <SchemaComponent :schema="schema" :provider="provider">
    </SchemaComponent>
  </div>
</template>

<style scoped>
.login {
  width: 400px;
  margin: 40px auto 0;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}
</style>
