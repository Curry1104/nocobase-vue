import { inject, provide } from "vue";
import Page from '../components/Page/Page.vue'
import Grid from '../components/Grid/Grid.vue'
import { Row, Col } from 'ant-design-vue'
import CardItem from '../components/CardItem/CardItem.vue'
import Chart from '../components/Chart/Chart.vue'
// import G2Plot from '../components/G2Plot/G2Plot.vue'
export default function useProvider(plugins = {}) {
  provide('components', {
    Page, Grid, Row, Col, CardItem, Chart,
    ...plugins
  })
}