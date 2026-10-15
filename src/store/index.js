import Vue from 'vue'
import Vuex from 'vuex'

import product from "@/store/modules/product"
import cart from "@/store/modules/cart"
import spin from "@/store/modules/spin"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    cart,
    spin
  },
  state: {},
  mutations: {},
  actions: {}
})
