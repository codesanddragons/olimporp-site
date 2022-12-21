<template>
  <div id="app">
    <!-- eslint-disable -->
  
    <topMenu />
    <!-- <videoBackground/> -->
    <router-view />
  </div>
</template>

<script>
import topMenu from "./components/topMenu.vue";

export default {
  data() {
   
  },

  components: {
    topMenu,
  }
};
</script>

<style>
body {
  overflow-y: hidden;
}
</style>
