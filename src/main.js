import Vue from 'vue'

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Bundle CSS
import 'framework7/css/framework7.bundle.min.css'

// Import F7 Icons
import 'framework7-icons';

// Import Material Icons
// import "vue-material-design-icons/styles.css";

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Init F7-Vue Plugin
Framework7.use(Framework7Vue);

// Import Main App component
import App from './App.vue';

// Import vuex store
import store from './store/store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
