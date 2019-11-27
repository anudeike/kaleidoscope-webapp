import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import firebase from 'firebase';

Vue.config.productionTip = false;

// configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkGlolF3sN2uPG9TPHzWdVQ-ue0e6URXo",
  authDomain: "kaleidoscope-app-92131.firebaseapp.com",
  databaseURL: "https://kaleidoscope-app-92131.firebaseio.com",
  projectId: "kaleidoscope-app-92131",
  storageBucket: "kaleidoscope-app-92131.appspot.com",
  messagingSenderId: "398603519978",
  appId: "1:398603519978:web:4cbab1d724cda0842ad493",
  measurementId: "G-MJPHFWQG7N"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
