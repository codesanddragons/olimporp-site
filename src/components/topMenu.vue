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
        v-model="alertModal"
        title="ATENÇÃO"
        ok-only
        header-bg-variant="dark"
        header-text-variant="light"
        centered
      >
        <p class="my-2">
          Enviamos por email o link para liberação de whitelist.
        </p>
      </b-modal>

      <b-modal
        v-model="modalShow"
        id="modal-prevent-closing"
        centered
        title="Liberação de White List"
        ok-title="Enviar"
        hide-footer
        header-bg-variant="dark"
        header-text-variant="light"
        no-stacking
      >
        <div>
          <b-form ref="form">
            <b-form-group
              id="input-group-1"
              label="E-mail:*"
              label-for="input-1"
              description="ATENÇÃO: Enviaremos um e-mail de confirmação."
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
              label="Seu Nome Real:*"
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
              id="input-group-whatsappNumber"
              label="Whatsapp:"
              label-for="input-whatsappNumber"
            >
              <b-form-input
                id="input-whatsappNumber"
                v-model="form.whatsappNumber"
                placeholder="Numero do Whatsapp para envio de descontos"
                v-bind:class="{
                  'is-valid': whatsappNumberIsValid,
                  'is-invalid': whatsappNumberIsInvalid,
                }"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="Numero do passaporte(Whitelist):*"
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
                Aceito os termos e regras da cidade (disponivel no discord)*
              </b-form-checkbox>
              <b-form-checkbox
                id="acceptNewsletters"
                v-model="form.acceptNewsletters"
                name="acceptNewsletters"
                value="true"
                unchecked-value="false"
              >
                Aceito receber novidades por e-mail/Whatsapp
              </b-form-checkbox>
            </b-form-group>
          </b-form>
        </div>

        <template>
          <b-row id="footerModal">
            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
              @hidden="onHidden"
            >
              <b-button
                variant="success"
                :disabled="busy"
                ref="button"
                @click="formSubmit()"
                class="footerModal-button"
              >
                Enviar
              </b-button>
            </b-overlay>
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
        whatsappNumber: "",

        whitelist: "",
        indicationWhitelist: "",
        acceptNewsletters: false,
        acceptTerms: false,
      },
      modalShow: false,
      alertModal: false,
      showAlert: false,
      errorMessage: "",
      submitStatus: null,
      busy: false,
      activationCode: "",

      emailIsValid: null,
      emailIsInvalid: null,
      realNameIsValid: null,
      realNameIsInvalid: null,
      whatsappNumberIsValid: null,
      whatsappNumberIsInvalid: null,
      whitelistIsValid: null,
      whitelistIsInvalid: null,
      indicationWhitelistIsValid: null,
      indicationWhitelistIsInvalid: null,
      acceptTermsIsValid: null,
      acceptTermsIsInvalid: null,
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

      if (
        this.form.whatsappNumber.length > 0 &&
        !this.isNumber(this.form.whatsappNumber)
      ) {
        this.errorMessage += "Somente numeros é permitido";
        this.showAlert = true;
        this.whatsappNumberIsInvalid = true;
        return false;
      } else if (
        this.form.whatsappNumber.length > 0 &&
        this.isNumber(this.form.whatsappNumber)
      ) {
        this.whatsappNumberIsInvalid = false;
        this.whatsappNumberIsValid = true;
      } else if (this.form.whatsappNumber.length > 0) {
        this.whatsappNumberIsInvalid = false;
        this.whatsappNumberIsValid = false;
      }

      if (this.form.whitelist === "") {
        this.errorMessage += "Numero do passaporte (Whitelist):";
        this.showAlert = true;
        this.whitelistIsInvalid = true;
        return false;
      }
      this.whitelistIsInvalid = false;
      this.whitelistIsValid = true;

      if (
        this.form.whitelist.length > 0 &&
        !this.isNumber(this.form.whitelist)
      ) {
        this.errorMessage += "Somente numeros é permitido";
        this.showAlert = true;
        this.whitelistIsInvalid = true;
        return false;
      }
      this.whitelistIsInvalid = false;
      this.whitelistIsValid = true;

      if (
        this.form.indicationWhitelist.length > 0 &&
        !this.isNumber(this.form.indicationWhitelist)
      ) {
        this.errorMessage += "Somente numeros é permitido";
        this.showAlert = true;
        this.indicationWhitelistIsInvalid = true;
        return false;
      } else if (
        this.form.indicationWhitelist.length > 0 &&
        this.isNumber(this.form.indicationWhitelist)
      ) {
        this.indicationWhitelistIsInvalid = false;
        this.indicationWhitelistIsValid = true;
      } else if (this.form.indicationWhitelist.length === 0) {
        this.indicationWhitelistIsInvalid = false;
        this.indicationWhitelistIsValid = false;
      }

      if (this.form.acceptTerms === false) {
        this.errorMessage += "Você precisa aceitar os termos";
        this.showAlert = true;
        this.acceptTermsIsInvalid = true;
        return false;
      }
      this.acceptTermsIsInvalid = false;
      this.acceptTermsIsValid = true;

      this.errorMessage = "";
      this.showAlert = false;
      return true;
    },
    resetForm() {
      this.form.email = "";
      this.form.realName = "";
      this.form.whatsappNumber = "";
      this.form.whitelist = "";
      this.form.indicationWhitelist = "";
      this.form.acceptTerms = false;
      this.form.acceptNewsletters = false;
      this.emailIsValid = null;
      this.emailIsInvalid = null;
      this.realNameIsValid = null;
      this.realNameIsInvalid = null;
      this.whatsappNumberIsValid = null;
      this.whatsappNumberIsInvalid = null;
      this.whitelistIsValid = null;
      this.whitelistIsInvalid = null;
      this.indicationWhitelistIsValid = null;
      this.indicationWhitelistIsInvalid = null;
      this.acceptTermsIsValid = null;
      this.acceptTermsIsInvalid = null;

      //   this.emailState = null;
      //   this.realNameState = null;
      //   this.whitelistState = null;
      //   this.acceptTermsState = null;
    },
    formSubmit() {
      this.busy = true;
      //verificar se a wl existe na tabela e verificar se realmente não esta liberado
      //se ja estiver liberado enviar uma mensagem de erro
      //se nao estiver, salvar os campos preenchidos e enviar um link para o email que foi digitado
      //ao clicar no link de confirmação enviado por e-mail, a wl sera desbloqueada

      if (!this.checkFormValidity()) {
        this.busy = false;
        return;
      }
      this.$http
        .post("/v1/preregistration", this.form)
        .then((response) => {
          this.activationCode = response.data.uuid;

          this.$http
            .post("/v1/send", {
              name: this.form.realName,
              email: this.form.email,
              //activatedUrl: "https://olimporp.com.br/ativar/wl/"+this.activationCode,
              activatedUrl:
                "https://olimporp.com.br/#/ativar/wl/" + this.activationCode,
            })
            .then(() => {
              this.alertModal = true;
              this.busy = false;
              // Hide the modal manually
              //this.$nextTick(() => {
              //  this.$bvModal.hide("modal-prevent-closing");
              //});
              this.resetForm();
              console.log("email enviado");
            })
            .catch((error) => {
              console.log(error);
              this.errorMessage =
                "Um erro inesperado aconteceu, tente novamente em alguns minutos. Se o error persistir, entre em contato com o suporte pelo discord.";
              this.showAlert = true;
              this.busy = false;
            });
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage =
            "Um erro inesperado aconteceu, tente novamente em alguns minutos. Se o error persistir, entre em contato com o suporte pelo discord.";
          this.showAlert = true;
          this.busy = false;
        });

      //console.log(JSON.stringify(this.form))
    },
    validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    isNumber(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus();
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