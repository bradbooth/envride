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
    props: {
      placeholder: { type: String, default: '' }
    },
    data(){
        return {
           search: "",
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
    margin: 10px;
    font-size: 20px;
    z-index: 100;
  }
</style>