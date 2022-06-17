<script setup lang='ts'>
import { SchemaSymbol } from '@formily/vue'
import { Button } from 'ant-design-vue'
import { inject } from 'vue';
const props = defineProps<{
  useAction,
  htmlType,
  block,
  style,
  type,
  content
}>()
const {useAction, htmlType, block, style, type} = props
</script>

<template>
<div>
  <Button :htmlType="htmlType" :block="block" :type="type" :style="style" @click="useAction">{{content}}</Button>
</div>
</template>

<style scoped>

</style>