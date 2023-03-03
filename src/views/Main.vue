<template>
    <div class="contenedor">
        <div class="solapa">
            
        </div>
        <div class="formulario">
            <b-container fluid="">
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                Formulario
                            </h3>
                        </b-col>
                        
                        <b-col sm="4" class="mt-3">
                            <label for="">País</label>
                            <select  class="form-control form-control-sm" required v-model="pais">
                                <option value="">Selecciona</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Chile">Chile</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="el salvador">El Salvador</option>
                                <option value="España">España</option>
                                <option value="usa">Estados Unidos</option>
                                <option value="guatemala">Guatemala</option>
                                <option value="honduras">Honduras</option>
                                <option value="Inglaterra">Inglaterra</option>
                                <option value="Italia">Italia</option>
                                <option value="mexico">México</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Panamá">Panamá</option>
                                <option value="Perú">Perú</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Suecia">Suecia</option>
                                <option value="Suiza">Suiza</option>
                                <option value="otro">Otro</option>
                            </select>
                        </b-col>
                        <b-col sm="8" class="mt-3">
                            <label for="">Ciudad / Departamento</label>
                            <b-form-input type="text" size="sm" required v-model="ciudad"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Región / Cono / </label>
                            <b-form-input type="text" size="sm"  required v-model="region"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Cargo</label>
                            <select  class="form-control form-control-sm" required v-model="cargo">
                                <option value="">Seleccionar</option>
                                <option value="pastor">Pastor</option>
                                <option value="obrero">Obrero</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Nombres</label>
                            <b-form-input type="text" id="nombre_form" size="sm" required v-model="nombres"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Apellidos</label>
                            <b-form-input type="text" size="sm"  required v-model="apellidos"></b-form-input>
                        </b-col>
                        <b-col v-if="foto_cargada == false" sm="12" class="mt-3">
                            <label for="">Foto</label>
                                <div class="area-foto"  @dragenter.prevent.stop="dragStart" @dragleave="dragEnd" @dragover.prevent @drop="dragFile">
                                    Arrastra la foto aquí
                                </div>
                        </b-col>
                        <b-col v-if="foto_cargada" sm="6" class="mt-3">
                            <div class="foto_vista_previa">
                                <img :src="fb64" alt="" class="img_vista_previa">
                            </div>
                        </b-col>
                        <b-col v-if="foto_cargada" sm="6" class="mt-3">
                            <div class="contenedor_botonera">
                                <b-button type="button" variant="danger" size="sm" @click="cambiar_foto">Cambiar</b-button>
                            </div>
                        </b-col>
                        <b-col v-if="fb64 != ''" sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="outline-success" size="sm">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>

            </b-container>
            <div class="boton_lista" @click="cambiar_ruta">
                <i class="fas fa-list"></i>
            </div>
        </div>

        <Actualizar v-if="actualizacion_disponible" />

        <Login v-if="llave.length == 0" />

    </div>
</template>

<script>

import { ipcRenderer } from 'electron'
import axios from 'axios'
import moment from 'moment'
import { minix } from '../components/functions/alertas'
import { IP } from '../components/config/parametros'

import Login from '../components/Login.vue'
import Actualizar from '../components/Actualizar.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    name: 'Main',
    computed: {
        ...mapState(['llave', 'actualizacion_disponible']),
        ...mapGetters(['stf', 'stfc'])
    },
    components:{
        Login,
        Actualizar
    },
    data() {
        return {
            pais: '',
            ciudad: '',
            region: '',
            cargo: '',
            nombres: '',
            apellidos: '',
            foto_cargada: false,
            fb64: ''
        }
    },
    methods: {
        async dragFile(e){

            let ruta = e.dataTransfer.files[0].path
            let r = await ipcRenderer.invoke('fotob64', ruta)
            this.fb64 = r

            this.foto_cargada = true

        },
        dragStart(event) {
            event.target.classList.add("dragging");
        },
        dragEnd(event) {
            event.target.classList.remove("dragging");
        },
        cambiar_foto(){
            this.foto_cargada = false
            this.fb64 = ''
        },
        cambiar_ruta(){
            this.$router.replace('lista')
        },
        async guardar(){

            try {

                let f = {
                    data: {
                        nombres: this.nombres.toUpperCase().trim(),
                        apellidos: this.apellidos.toUpperCase().trim(),
                        pais: this.pais.toUpperCase(),
                        ciudad: this.ciudad.toUpperCase().trim(),
                        region: this.region.trim(),
                        cargo: this.cargo.toUpperCase(),
                        retiro_year: moment(Date.now()).format('YYYY'),
                        foto_b64: this.fb64,
                        token_sesion: this.stfc,
                        creacion: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
    
                let r = await axios.post(`http://${IP}:1337/api/registros`, f, this.stf)
    
                if (r.status == 200) {
                    minix({icon: 'success', mensaje: 'GUARDADO CON EXITO', tiempo: 3000})
    
                    this.nombres = ''
                    this.apellidos = ''
                    this.foto_cargada = false
                    this.fb64 = ''
    
                    document.getElementById('nombre_form').focus()
    
                }else{
    
                    minix({icon: 'error', mensaje: 'ALGO SALIÓ MAL', tiempo: 3000})
                }
                
            } catch (error) {
                
                 if (error.response.status == 403) {
                    minix({icon: 'error', mensaje: 'NO TIENES PERMISOS', tiempo: 3000})
                }else{
                    minix({icon: 'info', mensaje: error.message, tiempo: 3000})
                }
            }


        },
        ...mapActions(['obtener_version'])
    },
    mounted() {
        setTimeout(() => {
            this.obtener_version()
        }, 2000);
    },
}
</script>

<style>
    .contenedor{
        width: 100%;
        height: 100vh;
        background-color: #d5d7db;
    }
        .solapa{
            width: 100%;
            height: 120px;
            background-color: #001e53;
        }

        .formulario{
            width: 450px;
            height: 700px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -225px;
            margin-top: -350px;
        }
            .area-foto{
                width: 100%;
                height: 210px;
                border: 2px dashed #b9e2cc;
                color: #b9e2cc;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }

                .dragging {
                    opacity: 0.5;
                }

        .foto_vista_previa{
            width: 200px;
            height: 250px;
            overflow: hidden;
        }

        .img_vista_previa{
            width: 100%;
        }

        .contenedor_botonera{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

            .boton_lista{
                width: 45px;
                height: 45px;
                position: fixed;
                bottom: 30px;
                right: 15px;
                border-radius: 50%;
                z-index: 1001;
                background-color: #172b48;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
                cursor: pointer;
                color: white;
                transition: .4s ease;
            }

            .boton_lista:hover{
                background-color: #545e71;
            }
</style>