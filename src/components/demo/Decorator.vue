<script setup lang='ts'>
import { FormProvider, createSchemaField, useFieldSchema } from '@formily/vue'
defineProps<{ n: number }>()
console.log(useFieldSchema())
</script>

<template>
  <div class="dec">
    Decorator
    {{ n }}
    <slot></slot>
  </div>
</template>

<style scoped>
.dec{
  user-select: none;
}
</style>