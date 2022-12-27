<template>
  <div class="container-flex">
    <div class="image-flex">
      <b-img :src="require(`@/assets/logo-main.gif`)"></b-img>
    </div>
    <b-container>
      <b-card class="text-center">
        <h1>WhiteList Liberada</h1>
        <p>Estamos muito felizes em ter você em nossa cidade.</p>
        <p>
          Não esqueça de verificar se você esta no discord da cidade:
          <a href="https://discord.gg/E4BeXE9sJK"> Clicando Aqui </a> <br />
          É muito importante que leia e siga todas as regras para que sua
          permanencia seja longa. <br />
          Trabalharemos com afinco para lhe oferecer a cada dia as melhores
          experiencias, buscando sempre a costumeira excelência no atendimento e
          na qualidade.
        </p>
        <p>Divirta-se</p>
      </b-card>
    </b-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  }
};
</script>

<style>
.container-flex {
  height: 93vh;
  background-image: url("@/assets/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.image-flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
</style>