<template>
    <div class="btn_actualizar" id="bt_actualizar" @mouseover="entrar_cuadro_actualizacion" @mouseleave="salir_cuadro_actualizacion" @click="aplicar_actualizacion">
        ACTUALIZACIÓN DISPONIBLE
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Actualizar',
    data() {
        return {
            
        }
    },
    methods: {
        entrar_cuadro_actualizacion(){
            document.getElementById('bt_actualizar').innerText = 'ACTUALIZAR!'
        },
        salir_cuadro_actualizacion(){
            document.getElementById('bt_actualizar').innerText = 'ACTUALIZACIÓN DISPONIBLE'
        },
        aplicar_actualizacion(){
            this.push_actualizacion()
        },
        ...mapActions(['push_actualizacion'])
    },
}
</script>

<style>
    .btn_actualizar{
        width: 100%;
        height: 45px;
        background-color: #39a9db;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
        user-select: none;
        transition: .4s ease;
        z-index: 1007;
        position: fixed;
        bottom: 0;
        left: 0;
    }
        .btn_actualizar:hover{
            background-color: #f39237;
        }
</style>