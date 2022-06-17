<script setup lang='ts'>
import { ISchemaFieldProps, createSchemaField, FormSymbol } from '@formily/vue'
import { computed } from '@vue/reactivity';
import { inject, onMounted } from 'vue';
import { toSchema } from './utils'
const props = defineProps<{
  provider: ISchemaFieldProps,
  schema: any
}>()
const { provider } = props
const { SchemaField } = createSchemaField(provider)

</script>

<template>
  <SchemaField :schema="toSchema(schema)"></SchemaField>
</template>

<style scoped>
</style>