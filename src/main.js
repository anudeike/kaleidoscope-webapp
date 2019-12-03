import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './firebase';
import VueResource from "vue-resource";
import { store } from "./store/store.js";

Vue.use(VueResource);
Vue.config.productionTip = false;

// fire
new Vue({
  store: store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");