import Vue from "vue";
import Router from "vue-router";
import LogoMain from "../components/logoMain";
import ActivateWl from "../components/activateWl";
import VerificationWL from "../components/verificationWl"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: LogoMain,
    },
    {
      path: "/ativar/wl/:id",
      component: VerificationWL,
    },
    {
      path: "/bemvindo",
      component: ActivateWl,
    },
  ],
});
