<template>
  <div>

      <VehicleSelect 
        v-on:vehicle-selected="updateVehicleInfo"
      />

      <Search 
        class="search-to" 
        v-on:update-search="updateOrigin"
        :placeholder="'Origin'" 
      />
      <Search 
        class="search-from" 
        v-on:update-search="updateDestination"
        :placeholder="'Destination'"
      />

      <button 
        class="search-button"
        @click="search"
      >
        Search
      </button>

      <div>
        <h4 v-if="distance">Distance:{{distance}} meters</h4>
        <h4 v-if="routeCo2">Trip CO2:{{routeCo2}} grams </h4>
      </div>


      <GmapMap
        ref="mapRef"
        :center="{lat:43.7181557, lng:-79.5181401}"
        :zoom="7"
        :options="options"
        map-type-id="terrain"
        style="width: 100%; height: 98vh"
      >

        <gmap-polyline 
          v-bind:path.sync="path" 
          v-bind:options="{ strokeColor:'#008000'}">
        </gmap-polyline>
      </GmapMap>

  </div>
</template>

<script>

import { mapStyle } from './MapStyle'
import Search from './Search'
import VehicleSelect from '../Vehicle/VehicleSelect'

export default {
  name: 'HelloWorld',
  components: {
      Search,
      VehicleSelect
  },
  data() {
    return {
      directions: null,
      origin: "",
      destination: "",
      path: [],
      distance: "",
      routeCo2: "",
      options: {
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
        styles: mapStyle
      },
    }
  },
  methods: {
      
      updateVehicleInfo(event){
        this.vehicleInfo = event
      },
      
      updateOrigin(event){
          this.origin = event
      },

      updateDestination(event){
          this.destination = event
      },

      search(){
        if ( this.origin && this.destination ){

          const url = 'api/maps/directions'
          const vehicleInfo = encodeURIComponent(JSON.stringify(this.vehicleInfo))

          this.$api.get(`${url}?origin=${this.origin}&destination=${this.destination}&vehicleInfo=${vehicleInfo}`).then( 
            (res) => {
                this.path = JSON.parse(res.data.coordinates)
                this.distance = parseInt(res.data.distanceInMeters)
                this.routeCo2 = parseInt(res.data.routeCo2InGrams)
            }
          )
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .search-button {
    width: 100px;
    height: 30px;
    margin: 10px;
  }

</style>
