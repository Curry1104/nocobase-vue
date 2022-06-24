<script setup lang='ts'>
import SchemaComponentProvider from '../components/SchemaComponent/SchemaComponentProvider.vue'
import { Input, Form, Button } from 'ant-design-vue'
import Action from '../components/Action/Action.vue'
import { provide } from 'vue';
provide('components', {
  Input, Form, Button, Action
})
</script>

<template>
  <SchemaComponentProvider>
    <router-view />
    <footer :style="{position: 'fixed', bottom: '20px', width: '100%', margin: '0 auto'}">Powered by nocobase</footer>
  </SchemaComponentProvider>
</template>

<style scoped>

</style>