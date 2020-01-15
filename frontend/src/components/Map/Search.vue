<template>
  <div>
    <input 
      class="search-bar"
      type="text"
      @change="onUpdate"
      v-model="search" 
      :placeholder="placeholder">
  </div>
</template>

<script>
export default {
    name: 'Search',
    props: ['placeholder'],
    data(){
        return {
           search: "",
           placeholder: ""
        }
    },
    methods: {
      onUpdate(){
        this.$emit('update-search', this.search)
      }
    }
}
</script>

<style>
  .search-bar {
    border: 5px solid black;
    border-radius: 25px;
    padding: 10px 15px;
    font-size: 20px;
    z-index: 100;
  }
</style>