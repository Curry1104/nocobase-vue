<script setup lang='ts'>
import { FormProvider, createSchemaField, RecursionField, SchemaOptionsSymbol, SchemaExpressionScopeSymbol } from '@formily/vue'
import { createForm } from '@formily/core'
const form = createForm()

</script>

<template>
  <FormProvider :form="form">
    <slot></slot>
  </FormProvider>
</template>

<style scoped>

</style>