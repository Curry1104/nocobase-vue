<script setup lang='ts'>
import { PageHeader } from 'ant-design-vue';
import { inject } from 'vue';
const curMenu = inject('curMenu')
</script>

<template>
  <PageHeader :ghost="false" :title="curMenu.title" />
  <div class="pageChild">
    <slot></slot>
  </div>
</template>

<style scoped>
.pageChild {
  margin: 24px;
}
</style>