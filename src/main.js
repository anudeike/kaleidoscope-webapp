import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './firebase';
import VueResource from "vue-resource";
import { store } from "./store/store.js";
import PulseLoader from 'vue-spinner/src/PulseLoader';
import RotateLoader from 'vue-spinner/src/RotateLoader';
import ColorThief from 'colorthief';

//const colorThief = new ColorThief();

Vue.use(VueResource);
Vue.use(ColorThief);

Vue.config.productionTip = false;


// fire
new Vue({
  components: {
    PulseLoader,
    RotateLoader
  },
  store: store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");