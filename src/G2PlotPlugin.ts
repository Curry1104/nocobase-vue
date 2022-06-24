import G2Plot from './components/G2Plot/G2Plot.vue'
import type { DefineComponent } from 'vue'
const G2PlotPlugin = {
  install(app: DefineComponent<{}, {}, any>) {
    app.component('G2Plot', G2Plot)
    app.config.globalProperties.plugins = { G2Plot }
  }
}

export { G2PlotPlugin }