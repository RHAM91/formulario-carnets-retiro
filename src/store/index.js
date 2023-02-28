import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objeto: []
  },
  getters: {
  },
  mutations: {
    set_objeto(state, data){
      state.objeto = data
    },
  },
  actions: {
    
  },
  modules: {
  }
})
