<template>
  <b-container> Verificando </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      this.$http
        .put("v1/validate/" + vm.id)
        .then((response) => {
          this.$http
            .put("v1/activated/" + response.data.whitelist)
            .then(() => {
              vm.$router.push("/bemvindo");
            })
            .catch((e) => {
              console.log(e);
              vm.$router.push("/");
            });

        })
        .catch((e) => {
          console.log(e);
          vm.$router.push("/");
        });
    });
  },
};
</script>

<style>
</style>