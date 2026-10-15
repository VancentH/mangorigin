<template>
  <div>
    <h1>{{ header }}</h1>
    <Divider></Divider>
    <div v-if="cartQuantity > 0" class="content">
      <ListItem></ListItem>
      <Summary></Summary>
    </div>
    <div v-else class="content">
      <h2>
        您的購物車目前沒有商品，請至
        <router-link :to="{ name: 'Item' }">商品列表</router-link> 選購！
      </h2>
    </div>
  </div>
</template>

<script>
import ListItem from "./components/ListItem";
import Summary from "./components/Summary";
import { mapGetters } from "vuex";

export default {
  components: {
    ListItem,
    Summary,
  },
  data() {
    return {
      header: "購物車",
    };
  },
  computed: {
    ...mapGetters(["cartQuantity"]),
  },
  created() {
    this.$store.dispatch("getCartItems");
  },
};
</script>

<style lang="less" scoped>
@import "assets/less/extend.less";
.content h2 {
  margin-top: 60px;
  text-align: center;
  a {
    text-decoration: underline;
  }
}
</style>
