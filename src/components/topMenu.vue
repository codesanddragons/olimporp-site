<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand id="brand-olimpo" href="#">OLIMPO</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-b-modal.modal-prevent-closing
          >White List</b-nav-item
        >
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item href="#" right>
          <b-icon icon="discord" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="instagram" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="instagram" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="instagram" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="instagram" font-scale="1"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <div>
      <b-modal
        id="modal-prevent-closing"
        centered
        title="Liberação de White List"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <div>
          <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              id="input-group-1"
              label="E-mail:"
              label-for="input-1"
              description="Nunca compartilharemos seu e-mail."
              invalid-feedback="Email é obrigatorio"
              :state="emailState"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Digite seu e-mail"
                :state="emailState"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Seu Nome Real:"
              label-for="input-2"
              invalid-feedback="Nome Real é obrigatorio"
              :state="realNameState"
            >
              <b-form-input
                id="input-2"
                v-model="form.realName"
                placeholder="Nome Completo"
                :state="realNameState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Nome do Personagem:"
              label-for="input-3"
              invalid-feedback="Nome do Personagem é obrigatorio"
              :state="charNameState"
            >
              <b-form-input
                id="input-3"
                v-model="form.charName"
                placeholder="Nome Completo do personagem"
                :state="charNameState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="Numero do passaporte(Whitelist):"
              label-for="input-4"
              invalid-feedback="Numero do passaporte é obrigatorio"
              :state="whitelistState"
            >
              <b-form-input
                id="input-4"
                v-model="form.whitelist"
                placeholder="Numero que apareceu quanto tentou entrar no cidade"
                :state="whitelistState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label="Alguem te indicou?"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="form.indicationWhitelist"
                placeholder="Se sim, digite o passaporte(whitelist) de quem indicou"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="acceptTerms"
                v-model="form.acceptTerms"
                name="acceptTerms"
                value="true"
                unchecked-value="false"
                invalid-feedback=""
                :state="acceptTermsState"
                required
              >
                Aceito os termos e regras da cidade (disponivel no discord)
              </b-form-checkbox>
              <b-form-checkbox
                id="acceptNewsletters"
                v-model="form.acceptNewsletters"
                name="acceptNewsletters"
                value="true"
                unchecked-value="false"
              >
                Aceito receber cupons/ofertas/novidades por e-mail
              </b-form-checkbox>
            </b-form-group>
          </b-form>
        </div>

        <template #modal-footer="{ cancel }">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button variant="danger" @click="cancel()"
            >Cancelar</b-button>
          <b-button variant="success" @click="event.submit"> Enviar </b-button>
        </template>
      </b-modal>
    </div>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        realName: "",
        charName: "",
        whitelist: "",
        indicationWhitelist: "",
        acceptNewsletters: false,
        acceptTerms: false,
      },
      modalShow: false,
      emailState: null,
      realNameState: null,
      charNameState: null,
      whitelistState: null,
      acceptNewslettersState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.emailState = valid;
      this.realNameState = valid;
      this.charNameState = valid;
      this.whitelistState = valid;
      this.acceptTermssState = valid;
      return valid;
    },
    resetModal() {
      this.form.email = "";
      this.form.realName = "";
      this.form.charName = "";
      this.form.whitelist = "";
      this.form.indicationWhitelist = "";
      this.form.acceptTerms = false;
      this.form.acceptNewsletters = false;

      this.emailState = null;
      this.realNameState = null;
      this.charNameState = null;
      this.whitelistState = null;
      this.acceptTermsState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      axios
        .post("https://localhost:3333/wlControler", this.form)
        .then((res) => {
          //carregando
          console.log(this.form);

          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
@font-face {
  font-family: phoenix;
  src: url("~@/fonts/Phoenix_Squad.ttf");
}
#brand-olimpo {
  margin-left: 1vh;
  font-family: phoenix;
  font-size: 4vh;
}
#nav-collapse {
  justify-content: space-between;
}
</style>