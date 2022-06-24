<script setup lang='ts'>
defineProps({
  insert: Function
})
</script>

<template>
  <a-sub-menu key="sub1">
    <template #title>Submenu</template>
    <a-menu-item key="setting:1" @click="insert">Option 1</a-menu-item>
    <a-menu-item key="setting:2" @click="insert">Option 2</a-menu-item>
    <a-menu-item key="setting:3" @click="insert">Option 3</a-menu-item>
  </a-sub-menu>

</template>

<style scoped>
</style>