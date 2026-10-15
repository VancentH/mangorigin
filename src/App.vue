<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { uuid } from "vue-uuid";

export default {
  name: "App",
  created() {
    const tid = localStorage.getItem("tid");
    if (!tid) localStorage.setItem("tid", uuid.v4());
    this.$api.login
      .login()
      .then((response) => {
        // console.log(response.data.token);
        localStorage.setItem("token", response.data.token); //got the token
        this.$store.dispatch("setIsAutoLogin");
        this.$store.dispatch("getCartItems");
      })
      .catch((error) => {
        this.$Message.error("autologin失敗: " + error);
      });
  },
};
</script>

<style scoped>
</style>
