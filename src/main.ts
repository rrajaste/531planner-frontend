import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from "vee-validate";

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faEye, faEyeSlash, faMinus, faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VeeValidate);

library.add(faSpinner, faEye, faEyeSlash, faMinus, faPlus, faTrash, faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
