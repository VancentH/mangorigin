<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1" class="layout-menu">
    <div class="layout-logo">
      <router-link :to="{ name: 'Home' }" tag="a">MangOrigin</router-link>
    </div>
    <CartButton :cartEntry="cartEntry"></CartButton>
    <div class="layout-nav">
      <MenuItem name="1">
        <router-link :to="{ name: 'Home' }" tag="li" active-class="active">
          首頁
        </router-link>
      </MenuItem>
      <MenuItem name="2">
        <router-link :to="{ name: 'Item' }" tag="li" active-class="active">
          <!-- <Icon type="md-cube" /> -->
          商品列表
        </router-link>
      </MenuItem>
      <MenuItem name="3">
        <router-link :to="{ name: 'Question' }" tag="li" active-class="active">
          <!-- <Icon type="md-help" /> -->
          常見問題
        </router-link>
      </MenuItem>
      <MenuItem name="4">
        <router-link :to="{ name: 'Cart' }" tag="li" active-class="active">
          購物車<span v-if="cartEntry > 0">({{ cartEntry }})</span>
        </router-link>
      </MenuItem>
      <MenuItem name="5">
        <router-link :to="{ name: 'Login' }" tag="li" active-class="active">
          <!-- <Icon type="md-contact" /> -->
          登入
        </router-link>
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
import CartButton from "@/components/CartButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CartButton,
  },
  data() {
    return {
      theme1: "dark",
    };
  },
  computed: {
    ...mapGetters(["cartEntry"]),
  },
  created() {
    this.$store.dispatch("getCartItems");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Oxygen:wght@700&family=Yuji+Boku&display=swap");

.layout-menu {
  height: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-menu .ivu-menu-item-active,
.layout-menu .ivu-menu-item:hover {
  border-bottom: 0;
}
.layout-logo {
  border-radius: 3px;
  /* TODO:abc */
  font-family: "Cairo", "Noto Sans TC", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  position: relative;
  left: 20px;
  font-size: 20px;
}
</style>
