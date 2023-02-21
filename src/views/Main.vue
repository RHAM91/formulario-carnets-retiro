<template>
    <div class="contenedor">
        <div class="solapa">
            
        </div>
        <div class="formulario">
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h3>
                            Formulario
                        </h3>
                    </b-col>
                    
                    <b-col sm="4" class="mt-3">
                        <label for="">País</label>
                        <select  class="form-control form-control-sm" v-model="pais">
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
                        <b-form-input type="text" size="sm" v-model="ciudad"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">Región / Cono / </label>
                        <b-form-input type="text" size="sm"  v-model="region"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">Cargo</label>
                        <select  class="form-control form-control-sm" v-model="cargo">
                            <option value="">Seleccionar</option>
                            <option value="pastor">Pastor</option>
                            <option value="obrero">Obrero</option>
                        </select>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Nombres</label>
                        <b-form-input type="text" size="sm" v-model="nombres"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Apellidos</label>
                        <b-form-input type="text" size="sm"  v-model="apellidos"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">Foto</label>
                            <div class="area-foto"  @dragenter.prevent.stop="dragStart" @dragleave="dragEnd" @dragover.prevent @drop="dragFile">
                                Arrastra la foto aquí
                            </div>
                    </b-col>        
                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" variant="outline-success" size="sm">Guardar</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
        return {
            pais: '',
            ciudad: '',
            region: '',
            cargo: '',
            nombres: '',
            apellidos: ''
        }
    },
    methods: {
        async dragFile(e){
            console.log(e.dataTransfer.files)
        },
        dragStart(event) {
            event.target.classList.add("dragging");
        },
        dragEnd(event) {
            event.target.classList.remove("dragging");
        }
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
</style>