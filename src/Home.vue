<template>
  <div>
    <div class="layout-banner">
      <!-- title & slider -->
      <!-- <slider :slides="banner"></slider> -->
      <!-- <h1 class="banner-text">{{bannerText}}</h1> -->
      <Title></Title>
    </div>
    <div>
      <!-- 最新消息 -->
      <Row>
        <i-col>
          <!-- 最新消息 -->
          <news @onNewsSelect="preview($event)"></news>
        </i-col>
      </Row>
    </div>
    <modal-dialog ref="dialog" @dialogClose="selected = undefined">
      <div slot="control">
        <Button
          type="text"
          icon="md-close"
          shape="circle"
          style="right: -10px"
          @click.prevent="$refs.dialog.close()"
        ></Button>
      </div>
      <template v-if="selected">
        <div slot="header">
          <h2>{{ selected.title }}</h2>
          <div>{{ selected.date + " " + selected.time }}</div>
        </div>
        <div>
          <img :src="selected.img_url" alt="News image" />
          <div v-html="selected.desc"></div>
        </div>
      </template>
    </modal-dialog>
  </div>
</template>

<script>
import Title from "./components/Title";
import News from "./components/News";
import ModalDialog from "./components/Dialog";

export default {
  components: {
    Title,
    News,
    ModalDialog,
  },
  data() {
    return {
      selected: undefined,
      banner: [
        {
          id: 1,
          name: "1",
          url: require("./assets/image/825x400-1.png"),
        },
        {
          id: 2,
          name: "2",
          url: require("./assets/image/825x400-2.png"),
        },
        {
          id: 3,
          name: "3",
          url: require("./assets/image/825x400-3.png"),
        },
      ],
    };
  },
  methods: {
    preview(news) {
      // console.log("preview");
      this.selected = news;
      this.$refs.dialog.open();
    },
  },
};
</script>

<style scoped>
</style>
