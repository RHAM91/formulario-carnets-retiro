<template>
    <div class="contenedor_login">
        <div class="formulario_login">
            <div class="logo">

            </div>
            <div class="campos">
                <b-container v-if="campo_token == false" fluid="">
                    <form @submit.prevent="guardar">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <label for="">Nombre del coordinador</label>
                                <b-form-input type="text" size="sm" required v-model="nombre"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-2">
                                <label for="">Correo</label>
                                <b-form-input type="email" size="sm" required v-model="correo" placeholder="@"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <b-button type="submit" variant="info" block size="sm">Solicitar token</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>

                <b-container v-if="campo_token" fluid="">
                    <form @submit.prevent="guardar_token">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <p>
                                    Se ha enviado un token al correo: {{ datos_usuario.correo }}
                                </p>
                            </b-col>
                            <b-col sm="12" class="mt-2">
                                <label for="">Token</label>
                                <b-form-input type="text" size="sm" required v-model="token" placeholder="Escribe aquí el token"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <b-button type="submit" variant="info" block size="sm">Registrar app</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { IP } from '../components/config/parametros'
import { mapMutations, mapState } from 'vuex';
import { minix } from '@/components/functions/alertas'

export default {
    name: 'Login',
    computed: {
        ...mapState(['datos_usuario', 'campo_token'])
    },
    data() {
        return {
            nombre: '',
            correo: '',
            token: ''
        }
    },
    methods: {
        async guardar(){

            let f = {
                data: {
                    nombre: this.nombre.toUpperCase().trim(),
                    correo: this.correo.trim()
                }
            }

            await axios.post(`http://${IP}:1337/api/clientes`, f)
            this.set_datos_usuario(f.data)

            this.nombre = ''
            this.correo = ''
            this.set_campo_token(true)
        },
        async guardar_token(){

            let f = {
                data: {
                    correo: this.datos_usuario.correo,
                    token: this.token.trim()
                }
            }

            let r = await axios.post(`http://${IP}:1337/api/validar_token`, f)

            if (r.data.message) {
                minix({icon: 'error', mensaje: r.data.message, tiempo: 3000})
            }else{
                this.set_llave(r.data)
                this.set_campo_token(true)
            }


        },
        ...mapMutations(['set_datos_usuario', 'set_campo_token', 'set_llave'])
    },
}
</script>

<style>
    .contenedor_login{
        width: 100%;
        height: 100vh;
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1002;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .formulario_login{
            border: 1px solid black;
            width: 300px;
            height: 400px;
        }
</style>