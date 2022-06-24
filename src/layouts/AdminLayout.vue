<script setup lang='ts'>
import { getCurrentInstance, ref, provide } from 'vue'
import { Layout, Menu } from 'ant-design-vue';
import MenuEditor from '../components/MenuEditor/MenuEditor.vue'
import RouteSchemaComponent from '../components/RouteSchemaComponent/RouteSchemaComponent.vue'
import SchemaComponentProvider from'../components/SchemaComponent/SchemaComponentProvider.vue'
import api from '../api/api';
import router from '../router';
import useProvider from './useProvider'
const internalInstance = getCurrentInstance()
const plugins = internalInstance?.appContext?.config.globalProperties.plugins || {}
useProvider(plugins)
const uiSchemaUid = ref('')
const menuList = ref({})
const tMenuList = ref({})
const visible = ref(false)
const schema = ref({})
const curMenu = ref({})
provide('curMenu', curMenu)
api.getRoutes('/uiRoutes:getAccessible').then(res => {
  const routes = res?.data?.data
  uiSchemaUid.value = routes.filter((route: { component?: string; }) => route.component === 'AdminLayout')[0]?.uiSchemaUid
}).then(() => {
  api.getJsonSchema(`/uiSchemas:getJsonSchema/${uiSchemaUid.value}`).then(res => {
    menuList.value = res?.data?.data?.properties
  })
})
const handleClick = (menu: { [x: string]: any; }, flag) => {
  curMenu.value = menu
  let uid = ''
  if (!menu.properties) {
    router.push(`/admin/${menu['x-uid']}`)
    uid = menu['x-uid']
    visible.value = flag ? true : false
  } else {
    for (let men in menu.properties) {
      if (menu.properties.hasOwnProperty(men)) {
        router.push(`/admin/${menu.properties[men]['x-uid']}`)
        uid = menu.properties[men]['x-uid']
      }
      break
    }
    tMenuList.value = menu.properties
    visible.value = true
  }
  api.getProperties(`/uiSchemas:getProperties/${uid}`).then(res=>{
    schema.value = res?.data?.data
  })
}
</script>

<template>
  <Layout>
    <Layout.Header>
      <div :style="{ display: 'flex', height: '100%' }">
        <div class="logoWrap">
          <img src="../assets/logo.png" alt="logo">
        </div>
        <div class="menuWrap">
          <li class="link active" v-for="menu in menuList" :key="menu['x-uid']" @click="handleClick(menu)">{{ menu['title'] }}
          </li>
          <!-- <Menu mode="horizontal">
            <MenuEditor :insert="addMenuItem" />
          </Menu> -->
        </div>
      </div>

    </Layout.Header>
    <Layout>
      <Layout.Sider theme="light" :style="{display: visible ? 'block' : 'none'}">
        <div :style="{ height: '100%', color: '#fff' }">
          <li class="link tlevel active" v-for="menu in tMenuList" :key="menu['x-uid']" @click="handleClick(menu, true)">{{ menu['title'] }}
          </li>
        </div>
      </Layout.Sider>
      <Layout.Content :style="{ minHeight: 'calc(100vh - 64px)' }">
      <SchemaComponentProvider>
        <RouteSchemaComponent :schema="schema" />
      </SchemaComponentProvider>
        
        <Layout.Footer :style="{ position: 'fixed', bottom: '20px', width: '100%', margin: '0 auto' }">
          <footer>Powered by nocobase
          </footer>
        </Layout.Footer>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<style scoped>
.logoWrap {
  width: 200px;
  color: rgb(255, 255, 255);
  padding: 0px;
  align-items: center;
}

.logoWrap img {
  padding: 0 16px;
  width: 100%;
}

.menuWrap {
  display: flex;
}

.link {
  list-style: none;
  color: rgba(255, 255, 255, 0.65);
  padding: 0 20px;
  cursor: pointer;
}

.link.activeClass {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-bottom: 5px solid #fff;
}

.link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.tlevel {
  box-sizing: border-box;
  color: #000;
  height: 60px;
  line-height: 60px;
}

.tlevel.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border-right: 4px solid #4ca5e0;
}

.tlevel:hover {
  background-color: #e6f7ff;
  color: #1890ff;
  border-right: 4px solid #4ca5e0;
}
</style>