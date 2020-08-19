import Vue from "vue";
import Buefy from "buefy";
import http from "./http";
import "buefy/dist/buefy.css";
import App from "./App.vue";
import VueHighlightJS from 'vue-highlightjs';
import VueClipboard from 'vue-clipboard2'

Vue.use(Buefy);
Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  render: h => h(App)
}).$mount("#app");

