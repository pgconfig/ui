import Vue from "vue";
import Buefy from "buefy";
import http from "./http";
import "buefy/dist/buefy.css";
import App from "./App.vue";

Vue.use(Buefy);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  render: h => h(App)
}).$mount("#app");
