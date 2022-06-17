<script setup lang='ts'>
import { Layout } from 'ant-design-vue';
</script>

<template>
  <Layout>
    <Layout.Header>
      <div :style="{color: '#fff'}">
        首页
      </div>
    </Layout.Header>
    <Layout>
      <Layout.Sider>
        <div :style="{height: '500px', color: '#fff'}">
          Sider
        </div>
      </Layout.Sider>
      <Layout.Content>
        <Layout.Footer>
          <footer :style="{position: 'fixed', bottom: '20px', width: '100%', margin: '0 auto'}">Powered by nocobase</footer>
        </Layout.Footer>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<style scoped>
</style>