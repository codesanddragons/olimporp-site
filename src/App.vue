<template>
  <div id="app">
    <topMenu/>
    <!-- <videoBackground/> -->
    <logoMain/>
  </div>
</template>

<script>
import topMenu from "./components/topMenu.vue";
import logoMain from "./components/logoMain.vue"


export default {
 
  components: {
    topMenu,
    logoMain
  },
};
</script>

<style>
body { overflow-y: hidden; }
</style>
