import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "https://olimpo-customer-api.herokuapp.com/integration"

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})