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
      axios
        .put("http://localhost:3350/customer/v1/validate/" + vm.id)
        .then((response) => {
          axios
            .put("http://localhost:3360/integration/v1/activated/" + response.data.whitelist)
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