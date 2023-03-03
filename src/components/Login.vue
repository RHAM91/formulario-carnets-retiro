<template>
    <div class="contenedor_login">
        <div class="formulario_login">
            <div class="logo">
                <img src="@/assets/2629.png" id="logo_iglesia" alt="" style="width: 60%;">
            </div>
            <div class="campos">
                <b-container v-if="campo_token == false" fluid="">
                    <form @submit.prevent="guardar">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <!-- <label for="">Nombre del coordinador</label> -->
                                <b-form-input type="text" size="sm" style="background-color: #e2e2e2;" placeholder="Nombre del Coordinador" required v-model="nombre"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-2">
                                <!-- <label for="">Correo</label> -->
                                <b-form-input type="email" size="sm" style="background-color: #e2e2e2;" required v-model="correo" placeholder="Correo"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <b-button type="submit" variant="success" block size="sm">Solicitar token</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>

                <b-container v-if="campo_token" fluid="">
                    <form @submit.prevent="guardar_token">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <p>
                                    En breve se enviará un token al correo: <b><i>{{ datos_usuario.correo }}</i></b>
                                </p>
                            </b-col>
                            <b-col sm="12" class="mt-2">
                                <b-form-input type="text" id="campo_token_registro" size="sm" required v-model="token" placeholder="Escribe aquí el token"></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <b-button type="submit" variant="danger" block size="sm">Registrar app</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>
            </div>
        </div>

        <div class="triangulo_a"></div>
        <div class="triangulo_b"></div>
        <div class="circulo_a"></div>
        <div class="circulo_b"></div>
        <div class="cuadrado_a"></div>

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

            await axios.post(`http://${IP}:1337/api/savemod`, f)
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
                document.getElementById('campo_token_registro').select()
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
        background-color: #f3f3f3;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1002;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .formulario_login{
            width: 300px;
            height: 425px;
        }

        .logo{
            width: 250px;
            height: 250px;
            margin: auto;
            margin-bottom: 15px;
            padding-left: 15px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #3f4c56; 
            /* 3f4c56 */
        }
            #logo_iglesia{
                filter: grayscale(75%);
            }

        .triangulo_a{
            width: 0; 
            height: 0; 
            border-left: 90px solid #a5b5a0;
            border-top: 50px solid transparent;
            border-bottom: 50px solid transparent;
            position: fixed;
            top: 167px;
            left: 392px;
            transform: rotate(5deg);
            transform: scale(0.2);
            
        }

        .triangulo_b{
            width: 0; 
            height: 0; 
            border-left: 22.5px solid #e37d00;
            border-top: 12.5px solid transparent;
            border-bottom: 12.5px solid transparent;
            position: fixed;
            top: 386px;
            left: 145px;
            transform: rotate(29deg);
            /* transform: scale(0.2); */
            
        }
        
        .circulo_a{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 4px solid #3d6ce9;
            position: fixed;
            top: 170px;
            left: 161px;
        }

        .circulo_b{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 4px solid #a11692;
            position: fixed;
            top: 415px;
            left: 420px;
        }

        .cuadrado_a{
            width: 18px;
            height: 18px;
            border: 3px solid #60935d;
            position: fixed;
            top: 130px;
            left: 370px;
            transform: rotate(10deg);
        }
            /* morado: a11692 */
</style>