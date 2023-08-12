import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VeeValidate from "vee-validate";
import "bootstrap/dist/css/bootstrap.css"; // Импорт стилей Bootstrap

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
