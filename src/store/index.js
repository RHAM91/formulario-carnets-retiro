import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { ipcRenderer } from 'electron'

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
    campo_token: false,
    version_app: {},
    actualizacion_disponible: false
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
    },
    set_version_app(state, data){
      state.version_app = data
    },
    set_actualizacion_disponible(state, data){
      state.actualizacion_disponible = data
    }
  },
  actions: {
    obtener_version({commit, state, dispatch}){
      ipcRenderer.send('get/version')
      ipcRenderer.on('version_app', (args) =>{
        ipcRenderer.removeAllListeners('get/version')
        commit('set_version_app', args)
      })

      ipcRenderer.on('actualizacion_disponible', (event, message) =>{
        commit('set_actualizacion_disponible', message)
      })
    },
    push_actualizacion(){
      ipcRenderer.send('instalar_actualizacion')
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
