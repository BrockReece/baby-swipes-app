// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import Vuetify from "vuetify";
import VueSwing from "vue-swing";
import "vuetify/dist/vuetify.css";

Vue.component("vue-swing", VueSwing);
Vue.use(Vuetify);

Vue.config.productionTip = false;

// Required for side-effects

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
