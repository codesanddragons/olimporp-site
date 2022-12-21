<template>
  <div class="flex-container">
    <div class="flex-item">
      <b-img :src="require(`@/assets/logo-main.gif`)"></b-img>
      <div style="color: #fff; text-align: center">
        <strong class="moreInfo">Mais Informações:</strong>
      </div>
      <nav class="btn_social">
        <ul>
          <li>
            <a href="https://discord.gg/E4BeXE9sJK" target="_blank" title="discord"
              ><b-icon icon="discord" font-scale="1"></b-icon
            ></a>
          </li>
          <li>
            <a href="#" title="facebook"
              ><b-icon icon="facebook" font-scale="1"></b-icon
            ></a>
          </li>
          <li>
            <a href="https://www.instagram.com/cidadeolimpo" title="instagram"
              ><b-icon icon="instagram" font-scale="1"></b-icon
            ></a>
          </li>
          <li>
            <a href="#" title="youtube"
              ><b-icon icon="youtube" font-scale="1"></b-icon
            ></a>
          </li>
          <li>
            <a href="#" title="linkdin"
              ><b-icon icon="twitter" font-scale="1"></b-icon
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>




</template>

<script>
export default {};
</script>

<style>
.flex-container {
  height: 91.5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background-image: url("@/assets/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.flex-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ul {
  padding: 0px;
}
.btn_social {
  width: 100%;
  float: left;
  display: flex;
}
.btn_social ul {
  width: auto;

  float: left;
  display: block;
}
.btn_social ul li {
  position: relative;
  background: #555555;
  list-style: none;
  float: left;
  margin: 5px;
  z-index: 1;
  overflow: hidden;
  border-radius: 5vh;
  font-size: 1.5em;
  text-align: center;
}
.btn_social ul li a {
  width: 50px;
  height: 50px;
  line-height: 53px;
  display: block;
  text-decoration: none;
  color: #fff;
  transition: 0.4s;
}
.btn_social ul li::before {
  transition: 0.4s;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 90%;
  left: 0;
  background: #ffaf00;
  z-index: -1;
  transform: scale(1);
  transition: 0.4s;
}
.btn_social ul li:hover::before {
  transition: 0.4s;
  top: 0%;
}
.btn_social ul li a:hover {
  color: #555555;
}
.moreInfo{
    font-size: 2.5vh;
    color: #ffb700;
    -webkit-text-stroke-width: 0.2px;
    -webkit-text-stroke-color: #000;
}
</style>