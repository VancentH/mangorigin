<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <Menu></Menu>
      </Header>
      <Content class="layout-content">
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </Content>
      <Footer class="layout-footer">
        <Footer></Footer>
      </Footer>
    </Layout>
    <!-- 購物車 -->
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "./components/Footer";

export default {
  components: {
    Menu,
    Footer,
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transition: translateX(-430px);
  opacity: 0;
}

.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header {
  /* Items sider z-index */
  z-index: 9;
  position: fixed;
  width: 100%;
}

.layout-content {
  margin: 88px 20px 20px;
  background: #fff;
  min-height: 500px;
}

.layout-footer {
  text-align: center;
}
</style>
