<template>
  <div v-show="show && cartEntry > 0">
    <router-link :to="{ name: 'Cart' }"
      ><Badge class="button" :count="cartEntry">
        <Icon type="ios-cart" size="32" /> </Badge
    ></router-link>
  </div>
</template>

<script>
export default {
  props: ["cartEntry"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleShow(routeName) {
      if (routeName === "Cart") this.show = false;
      else this.show = true;
    },
  },
  watch: {
    $route(to, from) {
      this.handleShow(to.name);
    },
  },
  created() {
    this.handleShow(this.$route.name); // target=_blank
  },
};
</script>

<style lang="less" scoped>
//TODO:
.button {
  z-index: 99;
  position: fixed;
  line-height: 50px;
  text-align: center;
  width: 4em;
  height: 4em;
  bottom: 6em;
  right: 5em;
  border-radius: 50%;
  border: 1px solid #e8eaec;
  background: #f0f8ff;
}
.button /deep/ sup {
  top: -5px;
  right: 5px;
}
</style>