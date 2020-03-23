<template>
  <div>
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
      
      <label class="distance">
              {{  showDistance }}
      </label>

      
      
      <button 
        class="calc-button"
        @click="calculate"
      >
        Calculate
      </button>

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

export default {
  name: 'HelloWorld',
  components: {
      Search
  },
  data() {
    return {
      directions: null,
      origin: "",
      destination: "",
      path: [],
      options: {
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
        styles: mapStyle
      },
      distance: ""
    }
  },
  methods: {
      updateOrigin(event){
          this.origin = event
      },

      updateDestination(event){
          this.destination = event
      },

      search(){
        if ( this.origin && this.destination ){
          this.$api.get(`api/maps/directions/?origin=${this.origin}&destination=${this.destination}`).then( 
            (res) => {
                this.path = res.data
            }
          )
        }
      },

      showDistance(){
        if ( this.origin && this.destination ){
          this.$api.get(`api/maps/distance/?origin=${this.origin}&destination=${this.destination}`).then( 
            (res) => {this.distance = res.data}
          )
        }
      },

      calculate(){
        if (this.distance){
          this.$api.get(`api/maps/co2/?dist=${this.distance}`).then( 
            (res) => {console.log(res.data)}
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

  .calc-button {
    width: 100px;
    height: 30px;
    margin: 10px;
  }

</style>
