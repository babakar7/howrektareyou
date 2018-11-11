import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    assetSelectedPrice: null
  },


  mutations: {


    setAssetPrices (state, prices) {

      state.assetSelectedPrice = prices

    }


  }


})
