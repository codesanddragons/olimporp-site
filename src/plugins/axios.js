import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://177.54.147.108:3350"

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})