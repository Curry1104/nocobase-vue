<script setup lang="ts">
import { FormProvider, createSchemaField, RecursionField, SchemaOptionsSymbol, SchemaExpressionScopeSymbol } from '@formily/vue'

import { Input, Form, Button } from 'ant-design-vue'
import api from './api/api'
import { provide, ref } from 'vue';
provide('api', api)

</script>

<template>
<!-- <SchemaField> -->

<router-view />
<!-- </SchemaField> -->
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
