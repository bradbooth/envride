<template>
  <div>

    <VehicleSelect />
    <Map />

  </div>
</template>

<script>

import VehicleSelect from './Vehicle/VehicleSelect'
import Map from './Map/Map'

export default {
  name: 'Main',
  components: {
    VehicleSelect,
    Map
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
