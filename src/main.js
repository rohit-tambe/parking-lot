import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueResource)
Vue.use(Vuex)
