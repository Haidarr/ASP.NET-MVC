import './css/style.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.min.css'

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './router'
import AppRoot from './components/app-root'
const moment = require('vue-moment')

Vue.use(moment)

const app = new Vue({
    vuetify,
    router,
  
    render: c => c(AppRoot)
}).$mount('#app')

