<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand id="brand-olimpo" href="#">OLIMPO</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-b-modal.modal-prevent-closing
          >WHITE LIST</b-nav-item
        >
      </b-navbar-nav>

      <!-- <b-navbar-nav>
        <b-nav-item href="#" right>
          <b-icon icon="discord" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="instagram" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="facebook" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="twitter" font-scale="1"></b-icon>
        </b-nav-item>
        <b-nav-item href="#" right>
          <b-icon icon="twitch" font-scale="1"></b-icon>
        </b-nav-item>
      </b-navbar-nav> -->
    </b-collapse>

    <div>
      <b-modal
        v-model="modalShow"
        id="modal-prevent-closing"
        centered
        title="Liberação de White List"
        ok-title="Enviar"
        hide-footer
      >
        <div>
          <b-form ref="form">
            <b-form-group
              id="input-group-1"
              label="E-mail:"
              label-for="input-1"
              description="Nunca compartilharemos seu e-mail."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Digite seu e-mail"
                v-bind:class="{
                  'is-valid': emailIsValid,
                  'is-invalid': emailIsInvalid,
                }"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Seu Nome Real:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.realName"
                placeholder="Nome Completo"
                v-bind:class="{
                  'is-valid': realNameIsValid,
                  'is-invalid': realNameIsInvalid,
                }"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Nome do Personagem:"
              label-for="input-3"
              invalid-feedback="Nome do Personagem é obrigatorio"
            >
              <b-form-input
                id="input-3"
                v-model="form.charName"
                placeholder="Nome Completo do personagem"
                v-bind:class="{
                  'is-valid': charNameIsValid,
                  'is-invalid': charNameIsInvalid,
                }"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="Numero do passaporte(Whitelist):"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.whitelist"
                placeholder="Numero que apareceu quanto tentou entrar no cidade"
                v-bind:class="{
                  'is-valid': whitelistIsValid,
                  'is-invalid': whitelistIsInvalid,
                }"
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
                v-bind:class="{
                  'is-valid': indicationWhitelistIsValid,
                  'is-invalid': indicationWhitelistIsInvalid,
                }"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="acceptTerms"
                v-model="form.acceptTerms"
                name="acceptTerms"
                value="true"
                unchecked-value="false"
                v-bind:class="{
                  'is-valid': acceptTermsIsValid,
                  'is-invalid': acceptTermsIsInvalid,
                }"
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

        <template>
          <b-row id="footerModal">
            <b-button
              variant="success"
              @click="formSubmit()"
              class="footerModal-button"
            >
              Enviar
            </b-button>
            <b-button
              variant="danger"
              @click="modalShow = false"
              class="footerModal-button"
              >Cancelar</b-button
            >
          </b-row>
        </template>
        <b-alert v-model="showAlert" variant="danger" id="erroAlert"
          >Verifique os sequites campos:<br /><strong>{{
            errorMessage
          }}</strong></b-alert
        >
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
      showAlert: false,
      errorMessage: "",
      submitStatus: null,
    };
  },

  methods: {
    checkFormValidity() {
      this.errorMessage = "";
      this.showAlert = false;

      if (this.form.email === "") {
        this.errorMessage += "E-mail";
        this.showAlert = true;
        this.emailIsInvalid = true;
        return false;
      }
      this.emailIsInvalid = false;
      this.emailIsValid = true;
      if (!this.validateEmail(this.form.email)) {
        this.errorMessage += "Formato invalido do E-mail";
        this.showAlert = true;
        this.emailIsInvalid = true;
        return false;
      }
      this.emailIsInvalid = false;
      this.emailIsValid = true;

      if (this.form.realName === "") {
        this.errorMessage += "Nome Real";
        this.showAlert = true;
        this.realNameIsInvalid = true;
        return false;
      }
      this.realNameIsInvalid = false;
      this.realNameIsValid = true;

      if (this.form.charName === "") {
        this.errorMessage += "Nome do Personagem";
        this.showAlert = true;
        this.charNameIsInvalid = true;
        return false;
      }
      this.charNameIsInvalid = false;
      this.charNameIsValid = true;

      if (this.form.whitelist === "") {
        this.errorMessage += "Numero do passaporte (Whitelist):";
        this.showAlert = true;
        this.whitelistIsInvalid = true;
        return false;
      }
      this.whitelistIsInvalid = false;
      this.whitelistIsValid = true;

      if (this.form.whitelist.length > 0 && !this.isNumber(this.form.whitelist)) {
        this.errorMessage += "Somente numeros é permitido";
        this.showAlert = true;
        this.whitelistIsInvalid = true;
        return false;
      }
      this.whitelistIsInvalid = false;
      this.whitelistIsValid = true;


      if (this.form.indicationWhitelist.length > 0 && !this.isNumber(this.form.indicationWhitelist)) {
        this.errorMessage += "Somente numeros é permitido";
        this.showAlert = true;
        this.indicationWhitelistIsInvalid = true;
        return false;
      }
      this.indicationWhitelistIsInvalid = false;
      this.indicationWhitelistIsValid = true;

      if (this.form.acceptTerms === false) {
        this.errorMessage += "Você precisa aceitar os termos";
        this.showAlert = true;
        this.acceptTermsIsInvalid = true;
        return false;
      }
      this.acceptTermsIsInvalid = false;
      this.acceptTermsIsValid = true;

      return true;
    },
    resetModal() {
      this.form.email = "";
      this.form.realName = "";
      this.form.charName = "";
      this.form.whitelist = "";
      this.form.indicationWhitelist = "";
      this.form.acceptTerms = false;
      this.form.acceptNewsletters = false;

      //   this.emailState = null;
      //   this.realNameState = null;
      //   this.charNameState = null;
      //   this.whitelistState = null;
      //   this.acceptTermsState = null;
    },
    formSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$http
        .post("https://localhost:3333/wlControler", this.form)
        .then(() => {
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
    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    isNumber(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
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
  /* justify-content: space-between; */
}
#footerModal {
  flex-direction: row-reverse;
}
.footerModal-button {
  margin-right: 1vh;
}
#erroAlert {
  margin-top: 10px;
}
</style>