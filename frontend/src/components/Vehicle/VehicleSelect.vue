<template>
    <div class="vehicle-options-container">
        Year
        <select class="form-control" v-model="selection.year" @change="yearChanged">
            <option v-for="year in vehicles.years" :value="year.text" :key="year.text">
            {{ year.text }}
            </option>
        </select>

        Make
        <select class="form-control" v-model="selection.make" @change="makeChanged">
            <option v-for="make in vehicles.makes" :value="make.text" :key="make.text">
            {{ make.text }}
            </option>
        </select>

        Model
        <select class="form-control" v-model="selection.model" @change="modelChanged">
            <option v-for="model in vehicles.models" :value="model.text" :key="model.text">
            {{ model.text }}
            </option>
        </select>

        Option
        <select class="form-control" v-model="selection.option" @change="optionChanged">
            <option v-for="option in vehicles.options" :value="option.text" :key="option.text">
            {{ option.text }}
            </option>
        </select>

        <!-- <textarea rows="15" cols="100" v-model="selection.data"></textarea> -->

    </div>
</template>

<script>

import axios from 'axios'

const url = 'https://www.fueleconomy.gov/ws/rest'

export default {
    name: 'VehicleSelect',
    data(){
        return {
            selection: {
                year: "",
                make: "",
                model: "",
                option: "",
                id: "",
                data: {}
            },
            vehicles : {
                years: [],
                makes: [],
                models: [],
                options: []
            }
            
        }
    },
    methods: {
        
        yearChanged(event){
            let year = event.target.value
            this.selection.year = year
            console.log("Year changed", year)
            axios
                .get(`${url}/vehicle/menu/make?year=${year}`)
                .then(response => (this.vehicles.makes = response.data.menuItem))
        },

        makeChanged(event){
            let make = event.target.value
            this.selection.make = make
            console.log("Make changed", make)
            axios
                .get(`${url}/vehicle/menu/model?year=${this.selection.year}&make=${make}`)
                .then(response => (this.vehicles.models = response.data.menuItem))
        },

        modelChanged(event){
            let model = event.target.value
            this.selection.model = model
            console.log("Model changed", model)
            axios
                .get(`${url}/vehicle/menu/options?year=${this.selection.year}&make=${this.selection.make}&model=${model}`)
                .then(response => {
                    let options = response.data.menuItem
                    this.vehicles.options = Array.isArray(options) ? options : [options]
                })
        },

        optionChanged(event){
            let option = event.target.value
            this.selection.option = option
            console.log("Option changed", option)
            
            let selection = this.vehicles.options.find( x => x.text == option)
            let id = selection.value   
            axios
                .get(`${url}/vehicle/${id}`)
                .then(response => (this.selection.data = JSON.stringify(response.data, null, 2)))
        }
    },

    mounted() {
        console.log(`${url}/vehicle/menu/year`)

        axios
            .get(`${url}/vehicle/menu/year`)
            .then(response => (this.vehicles.years = response.data.menuItem))
    }
}
</script>

<style>

.vehicle-options-container {
    padding: 30px;
}

</style>