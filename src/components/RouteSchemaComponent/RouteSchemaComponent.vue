<script setup lang='ts'>
import SchemaComponent from '../../components/SchemaComponent/SchemaComponent.vue'
import { inject } from 'vue';
defineProps<{schema: object}>()
const components = inject('components')
const provider = {
  components,
  scope: {
    useChartBlockProps: ()=>null,
    useCalendarBlockProps: ()=>null,
    t: ()=>null
  }
}
</script>

<template>
  <div>
    <SchemaComponent :schema="schema" :provider="provider">
    </SchemaComponent>
  </div>
</template>

<style scoped>

</style>