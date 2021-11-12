import Vue from 'vue'
import Vuex from 'vuex'
import currency from "./modules/currency";
import filter from "./modules/filter";


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        currency,
        filter
    }
})
