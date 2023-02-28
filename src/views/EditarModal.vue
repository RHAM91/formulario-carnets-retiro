<template>
    <div class="contenedor_modal">
        <b-container fluid="">
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

            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Edicion',
    computed: {
        ...mapState(['objeto'])
    },
    data() {
        return {
            pais: '',
            ciudad: '',
            region: '',
            cargo: '',
            nombres: '',
            apellidos: '',
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        }
    },
    mounted() {
      this.pais = this.objeto.attributes.pais
      this.ciudad = this.objeto.attributes.ciudad
      this.region = this.objeto.attributes.region
      this.cargo = this.objeto.attributes.cargo
      this.nombres = this.objeto.attributes.nombres
      this.apellidos = this.objeto.attributes.apellidos
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