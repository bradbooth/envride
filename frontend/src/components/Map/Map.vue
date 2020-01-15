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

      <GmapMap
        ref="mapRef"
        :center="{lat:43.7181557, lng:-79.5181401}"
        :zoom="7"
        :options="options"
        map-type-id="terrain"
        style="width: 100%; height: 98vh"
      >
        <!-- <DirectionsRenderer
          v-if="directions"
          :directions="directions"
          :from="destination" :to="center"
        /> -->

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
      }
    }
  },
  mounted () {

    this.$api.get('app').then( 
      (res) => {
          this.path = res.data
      }
    )
  },
  methods: {
      updateOrigin(event){
          this.origin = event
      },
      updateDestination(event){
          this.destination = event
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
