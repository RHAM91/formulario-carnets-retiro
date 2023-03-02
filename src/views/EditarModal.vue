<template>
    <div class="contenedor_modal">
        <b-container fluid="">
            <form @submit.prevent="guardar">
                <b-row>
                    <b-col sm="10" class="mt-3">
                        <h3>
                            Edición
                        </h3>
                    </b-col>
                    <b-col sm="2" class="mt-3">
                        <b-button type="button" variant="sm" size="outline-danger" @click="salir">Cerrar</b-button>
                    </b-col>
    
                    <b-col sm="4" class="mt-3">
                        <label for="">País</label>
                        <select  class="form-control form-control-sm" required v-model="pais">
                            <option value="">Selecciona</option>
                            <option value="ARGENTINA">Argentina</option>
                            <option value="BOLIVIA">Bolivia</option>
                            <option value="BRASIL">Brasil</option>
                            <option value="COLOMBIA">Colombia</option>
                            <option value="COSTA RICA">Costa Rica</option>
                            <option value="CHILE">Chile</option>
                            <option value="ECUADOR">Ecuador</option>
                            <option value="EL SALVADOR">El Salvador</option>
                            <option value="ESPAÑA">España</option>
                            <option value="USA">Estados Unidos</option>
                            <option value="GUATEMALA">Guatemala</option>
                            <option value="HONDURAS">Honduras</option>
                            <option value="INGLATERRA">Inglaterra</option>
                            <option value="ITALIA">Italia</option>
                            <option value="MEXICO">México</option>
                            <option value="NICARAGUA">Nicaragua</option>
                            <option value="PANAMÁ">Panamá</option>
                            <option value="PERÚ">Perú</option>
                            <option value="URUGUAY">Uruguay</option>
                            <option value="SUECIA">Suecia</option>
                            <option value="SUIZA">Suiza</option>
                            <option value="OTROS">Otro</option>
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
                            <option value="PASTOR">Pastor</option>
                            <option value="OBRERO">Obrero</option>
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
    </div>
</template>

<script>

import { ipcRenderer } from 'electron'
import axios from 'axios'
import moment from 'moment'
import { mapGetters, mapState } from 'vuex'
import { minix } from '../components/functions/alertas'
import { IP } from '../components/config/parametros'


export default {
    name: 'Edicion',
    computed: {
        ...mapState(['objeto']),
        ...mapGetters(['stf', 'stfc'])
    },
    data() {
        return {
            pais: '',
            ciudad: '',
            region: '',
            cargo: '',
            nombres: '',
            apellidos: '',
            foto_cargada: true,
            fb64: '',
            id_: ''
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
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

                let r = await axios.put(`http://${IP}:1337/api/registros/${this.id_}`, f, this.stf)

                if (r.status == 200) {
                    minix({icon: 'success', mensaje: 'ACTUALIZADO CON EXITO', tiempo: 3000})
                    this.salir()
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

            
        }
    },
    mounted() {
        this.id_ = this.objeto.id
        this.pais = this.objeto.attributes.pais
        this.ciudad = this.objeto.attributes.ciudad
        this.region = this.objeto.attributes.region
        this.cargo = this.objeto.attributes.cargo
        this.nombres = this.objeto.attributes.nombres
        this.apellidos = this.objeto.attributes.apellidos
        this.fb64 = this.objeto.attributes.foto_b64
    },
}
</script>

<style>
    .contenedor_modal{
        width: 100%;
        height: 100vh;
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
</style>