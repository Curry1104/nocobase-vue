<script setup lang='ts'>
import { Card } from 'ant-design-vue'
</script>

<template>
  <Card :style="{ marginBottom: 24 }" :bordered="false">
    <slot></slot>
  </Card>
</template>

<style scoped>

</style>