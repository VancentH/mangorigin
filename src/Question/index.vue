<template lang="pug">
div
  h1 常見問題
  Tabs.category(
    value="buy",
    v-if="this.questions.length && this.categories.length",
    @on-click="tabClicked"
  )
    TabPane(
      :label="category.category_label",
      :name="`${category.category_name}`",
      v-for="(category, index) in categories",
      :key="index"
    )
      Board(
        :boards="filterQuestion(category.category_id)",
        :categoryName="category.category_name",
        ref="boardComponent"
      )
</template>

<script>
import Board from "./Board";

export default {
  components: {
    Board,
  },
  data() {
    return {
      questions: [],
      categories: [],
    };
  },
  methods: {
    filterQuestion(category_id) {
      let self = this;
      return self.questions.filter((el) => {
        return el.category_id === category_id;
      });
    },
    tabClicked(name) {
      //   this.$refs.boardComponent.pageChange(1);
      //   console.log(name);
      //TODO: page switching
      // let vueComponent = this.$refs.boardComponent.filter(function (el) {
      //   return el.$attrs.categoryName === name;
      // });
      // console.log(vueComponent);
      // console.log(vueComponent[0].$attrs);
      // vueComponent[0].pageChange(1);
      //   console.log(this.$refs.boardComponent);
      //   this.$refs.boardComponent[name].pageChange(1);
    },
  },
  created() {
    this.$api.question
      .getCategories()
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.error(error);
        this.$Message.error("常見問題種類載入失敗!");
      });

    this.$api.question
      .getQuestions()
      .then((response) => {
        this.questions = response.data;
      })
      .catch((error) => {
        console.error(error);
        this.$Message.error("常見問題清單載入失敗");
      });
  },
};
</script>

<style lang="less" scoped>
.category {
  margin: 10px 0;
  /deep/ .ivu-tabs-nav-container {
    font-size: 1.3rem;
    font-weight: 700;
  }
}
</style>
