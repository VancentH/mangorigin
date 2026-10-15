<template lang="pug">
.board-wrapper
  Collapse.boards(:value="initCoallpse", simple)
    Panel.question(
      :name="`${board.question_id}`",
      v-for="(board, index) in historyList",
      :key="index"
    ) {{ index + 1 + plusPageIndex }}. {{ board.question_content }}
      div(slot="content")
        .answer(v-html="board.question_answer")
  Page.page(
    :total="listCount",
    :page-size="pageSize",
    size="small",
    show-total,
    @on-change="pageChange"
  )
    span 共有 {{ listCount }} 篇
</template>

<script>
export default {
  props: {
    boards: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      initCoallpse: [],
      listCount: "",
      historyList: "",
      CurrentPageIndex: "",
      pageSize: 3,
    };
  },
  created() {
    this.initPage();
    this.pageChange(1);
  },
  methods: {
    initPage() {
      let self = this;
      self.listCount = self.boards.length;
      // If the total number of items is less than the page size, use all data directly; otherwise slice the first page worth
      if (self.listCount < self.pageSize) {
        self.historyList = self.boards;
      } else {
        self.historyList = self.boards.slice(0, self.pageSize);
      }
    },
    pageChange(pageIndex) {
      // page index
      let self = this;
      let _start = (pageIndex - 1) * self.pageSize;
      let _end = pageIndex * self.pageSize;
      self.historyList = self.boards.slice(_start, _end);
      self.initCoallpse = [];
      self.CurrentPageIndex = pageIndex;
    },
  },
  computed: {
    plusPageIndex() {
      return (this.CurrentPageIndex - 1) * this.pageSize;
    },
  },
};
</script>

<style lang="less" scoped>
.question /deep/ .ivu-collapse-header {
  font-size: 1.2rem;
  font-weight: 700;
}
.question:nth-of-type(2n) {
  background-color: rgb(240 248 255);
  /deep/ .ivu-collapse-content {
    background-color: transparent;
  }
}
.page {
  font-size: 1.2rem;
}

.board-wrapper .boards {
  min-height: 400px;
  border-bottom-width: 0;
  border-top-width: 0;
  margin-bottom: 15px;

  > .ivu-collapse-item {
    border-top-width: 0;

    > .ivu-collapse-header {
      padding-left: 5px;
    }

    > .ivu-collapse-content {
      margin-left: 36px;
    }
  }
}
</style>
