<template>
    <div class="contenedor_lista">
        <div class="banner">
            <div class="cuadro_flecha_retorno" @click="regresar">
                <i class="fas fa-arrow-left"></i>
            </div>
        </div>
        <div class="cuerpo_lista">
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h3>
                            Lista
                        </h3>
                    </b-col>

                    <b-col v-for="(item, index) in datos" :key="index" sm="12" class="mt-2">

                        <div class="fila">
                            {{ item.foto_b64 }}
                            <div class="foto_fila">
                                <img :src="item.attributes.foto_b64" style="width: 100%;" alt="">
                            </div>
                            <div class="fila_datos_pastor">
                                <div class="nombre_">
                                    {{item.attributes.nombres}} {{ item.attributes.apellidos }}
                                </div>
                                <div class="seccion_">
                                    {{item.attributes.pais }}
                                </div>
                                <div class="seccion_">
                                    {{item.attributes.ciudad}}          
                                </div>
                                <div class="seccion_">
                                    {{item.attributes.cargo}}
                                </div>
                            </div>
                            <div class="botones__">

                                <div class="b_botones">
                                    <div class="boton____">
                                        <b-button type="button" variant="danger" block size="sm" @click="eliminar(item.id)">Eliminar</b-button>
                                    </div>
    
                                    <div class="boton____">
                                        <b-button type="button" variant="primary" block size="sm" @click="abrir_actualizar(item)">Editar</b-button>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </b-col>

                </b-row>
            </b-container>

            <Edicion v-if="modal" v-on:cerrar="cerrar_actualizar" />

        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { IP } from '../components/config/parametros'
import { minix, pregunta } from '@/components/functions/alertas'

import Edicion from './EditarModal.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Lista',
    computed: {
        ...mapGetters(['stf', 'stfc'])
    },
    components:{
        Edicion
    },
    data() {
        return {
            datos:[],
            modal: false,
            //o: ''
        }
    },
    methods: {
        regresar(){
            this.$router.replace('main')
        },
        async cargar_datos(){

            try {
                let r = await axios.get(`http://${IP}:1337/api/registros?filters[token_sesion][$eq]=${this.stfc}`, this.stf)
                this.datos = r.data.data
                
            } catch (error) {

                if (error.response.status == 403) {
                    minix({icon: 'error', mensaje: 'NO TIENES PERMISOS', tiempo: 3000})
                }else{
                    minix({icon: 'info', mensaje: error.message, tiempo: 3000})
                }

            }

        },
        async eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrar?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{
        
                if (i) {


                    try {
                        await axios.delete(`http://${IP}:1337/api/registros/${id}`, this.stf)
                        minix({icon: 'success', mensaje: 'BORRADO :)', tiempo: 3000})
                        this.cargar_datos()
                        
                    } catch (error) {

                        if (error.response.status == 403) {
                            minix({icon: 'error', mensaje: 'NO TIENES PERMISOS', tiempo: 3000})
                        }else{
                            minix({icon: 'info', mensaje: error.message, tiempo: 3000})
                        }
                    }
                
                }
            })
            
        },
        abrir_actualizar(obj){
            // this.o = obj
            this.set_objeto(obj)
            this.modal = true
        },
        cerrar_actualizar(){
            
            this.modal = false
            this.cargar_datos()
        },
        ...mapMutations(['set_objeto'])

    },
    mounted() {
        this.cargar_datos()
    },
}
</script>

<style>
    .contenedor_lista{
        width: 100%;
        height: 100vh;
    }
        .banner{
            width: 100%;
            height: 40px;
            background-color: #001e53;
        }
            .cuerpo_lista{
                width: 100%;
                height: calc(100vh - 40px);
            }
                .fila{
                    width: 100%;
                    height: 140px;
                    padding: 5px;
                    box-sizing: border-box;
                    display: flex;
                    border: 1px solid #636c7d;
                }
                    .foto_fila{
                        width: 110px;
                        height: 100%;
                        margin-right: 5px;
                        overflow: hidden;
                    }

                    .fila_datos_pastor{
                        width: 360px;
                        height: 100%;
                    }
                        .nombre_{
                            
                            font-weight: bold;
                            color: #545e71;
                            margin-bottom: 20px;

                        }
                            .seccion_{
                                font-size: 13px;
                            }

                    .botones__{
                        margin-left: 5px;
                        width: 78px;
                        display: flex;
                        align-items: center;
                    }
                        .boton____{
                            margin-bottom: 7px;
                        }

                        .b_botones{
                            width: 100%;
                        }

                        .cuadro_flecha_retorno{
                            color: white;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            user-select: none;
                            cursor: pointer;
                        }
</style>             
