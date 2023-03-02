import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({
    llave: state.llave,
    datos_usuario: state.datos_usuario,
    campo_token: state.campo_token
  }) 
})

export default new Vuex.Store({
  state: {
    objeto: [],
    llave: '',
    datos_usuario: {},
    campo_token: false
  },
  getters: {
    stf: state =>{
      let token_formateado ={
        headers:{
          Authorization: `Bearer ${state.llave}`
        }
      }

      return token_formateado
    },
    stfc: state =>{
      let acortado = state.llave.substring(0,8)
      return acortado
    }
  },
  mutations: {
    set_objeto(state, data){
      state.objeto = data
    },
    set_llave(state, data){
      state.llave = data
    },
    set_datos_usuario(state, data){
      state.datos_usuario = data
    },
    set_campo_token(state, data){
      state.campo_token = data
    }
  },
  actions: {
    
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
