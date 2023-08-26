import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VeeValidate from "vee-validate";
import "bootstrap/dist/css/bootstrap.css"; // Импорт стилей Bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  "ndsOadIQgsFoirb5cAvvz0VgLGkTKn1y7yQlzDBU",
  "BG32y5z17y0RLdFyUeJddFfnf72LOHegCed2VMOf"
);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
