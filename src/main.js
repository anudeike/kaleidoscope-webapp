import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './firebase';
import VueResource from "vue-resource";
import { store } from "./store/store.js";
import PulseLoader from 'vue-spinner/src/PulseLoader';

Vue.use(VueResource);
Vue.use(PulseLoader);
Vue.config.productionTip = false;


// fire
new Vue({
  components: {
    PulseLoader
  },
  store: store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");