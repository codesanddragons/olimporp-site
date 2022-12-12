import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3350"

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})