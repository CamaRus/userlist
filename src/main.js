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
  "tseW1dDWxz2GjgXkFRdl1i9FvJhoaiZFJqIpolU0",
  "FfGasWcXysuSi76kF2ExM26BKZ5A6Jh4c8fgcOJj"
);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
