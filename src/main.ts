import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { G2PlotPlugin } from './G2PlotPlugin'
import './permission';

const app = createApp(App).use(Antd).use(router).use(G2PlotPlugin)

app.mount('#app')
