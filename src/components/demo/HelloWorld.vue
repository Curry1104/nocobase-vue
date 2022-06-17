<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormProvider, createSchemaField, RecursionField, Schema } from '@formily/vue'
import { createForm } from '@formily/core'
import Decorator from './Decorator.vue'
import CoreCom from './CoreCom.vue'
import Designer from './Designer.vue'
defineProps<{ msg: string }>()

const count = ref(0)
const schema = {
  type: 'void',
  'x-decorator': Decorator,
  'x-decorator-props': {
    n: 1
  },
  'x-component': 'CoreCom',
  'x-component-props': {
    n: 2
  }
}
const click = () => {
  console.log(new Schema(schema))
}
const form = createForm()
const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    CoreCom,
    Decorator,
    Designer
  },
})
onMounted(()=>{
  console.log('========')
})
</script>

<template>
  <h1 @click="click">{{ msg }}</h1>
  <FormProvider :form="form">
    <SchemaField :schema="{
      type: 'void',
      properties: {
        'core': {
          'x-decorator': 'Decorator',
          'x-decorator-props': {
            n: 1
          },
          'x-component': 'CoreCom',
          'x-component-props': {
            n: 'test'
          },
          'x-designer': 'Designer'
        },
      },
    }">
    </SchemaField>
  </FormProvider>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
