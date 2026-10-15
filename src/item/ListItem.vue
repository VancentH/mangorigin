<template lang="pug">
.spin-container
  //- Grid
  Row.list(
    type="flex",
    align="bottom",
    v-if="showTemplate === 1 || active.includes(1)",
    v-show="showTemplate === 1"
  )
    i-col(
      v-for="(item, index) in historyListitem",
      :key="index",
      :xs="gridSetting.xs",
      :sm="gridSetting.sm",
      :md="gridSetting.md",
      :lg="gridSetting.lg",
      class-name="grid-item"
    )
      //- a(@click.prevent="ItemSelect(item.id)")
      router-link(:to="{ name: 'ItemDetail', params: { id: item.id } }")
        Card.item(:bordered="false")
          div(:style="{ textAlign: 'center', color: '#000' }")
            img(
              :src="$utility.getImageSource(item.image_id, item.image_type)",
              alt="img"
            )
            Poptip.discount(
              v-if="item.discount_enable === 1",
              trigger="hover",
              placement="top-end",
              popper-class="discount-popper",
              :title="item.discount_title",
              :content="`打${item.discount_content}`"
            )
              Button.discount-btn(size="small") {{ item.discount_content }}
            h4 {{ item.name }}
            span {{ item.location }}
            p
              | 售價：
              //- span {{ item.currency }}
              span.price ${{ item.price }}
              span.net-weight {{ ` / ${item.netweight}台斤` }}
  //- List
  .list-item-wrapper(
    v-if="showTemplate === 2 || active.includes(2)",
    v-show="showTemplate === 2"
  )
    Row(
      v-for="(item, index) in historyListitem",
      :key="index",
      :class-name="listRowCls",
      type="flex",
      justify="center",
      align="middle"
    )
      i-col(
        :xs="listSetting.xs",
        :sm="listSetting.sm",
        :md="listSetting.left.md",
        :lg="listSetting.left.lg",
        :class-name="listRowColFst",
        @click.native="ItemSelect(item.id)"
      )
        img(
          :src="$utility.getImageSource(item.image_id, item.image_type)",
          alt="img"
        )
        Poptip.discount(
          v-if="item.discount_enable === 1",
          trigger="hover",
          placement="right",
          popper-class="discount-popper",
          :title="item.discount_title",
          :content="`打${item.discount_content}`"
        )
          Button.discount-btn(size="small") {{ item.discount_content }}
      i-col(
        :xs="listSetting.xs",
        :sm="listSetting.sm",
        :md="listSetting.center.md",
        :lg="listSetting.center.lg",
        :class-name="listRowColSec",
        @click.native="ItemSelect(item.id)"
      )
        a
          h4 {{ item.name }}
        span {{ item.location }}
      i-col(
        :xs="listSetting.xs",
        :sm="listSetting.sm",
        :md="listSetting.right.md",
        :lg="listSetting.right.lg",
        :class-name="listRowColThr"
      )
        div
          h4
            | 售價：
            span.price ${{ item.price }}
          h4
            | 重量：
            span.net-weight {{ `${item.netweight}台斤` }}
  Page(
    v-if="listitemCount > 0",
    :current="CurrentPageIndex",
    :total="listitemCount",
    :page-size="pageSize",
    :class-name="pageCls",
    size="small",
    show-total,
    @on-change="pageChange"
  )
    span 共有 {{ listitemCount }} 筆商品
  div(v-show="historyListitem.length === 0") 無相關芒果產品
  Spin(size="large", v-if="itemSpinShow", fix)
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    showStyle: {
      type: Number, // 1: grid, 2: list
    },
    pageSize: {
      type: Number,
    },
  },
  data() {
    return {
      active: [], // singleton
      gridSetting: {
        xs: 24,
        sm: 24,
        md: 6,
        lg: 6,
      },
      listSetting: {
        xs: 24,
        sm: 24,
        left: {
          md: 6,
          lg: 6,
        },
        center: {
          md: 14,
          lg: 14,
        },
        right: {
          md: 4,
          lg: 4,
        },
      },
      listitemCount: 0, // page
      historyListitem: [],
      CurrentPageIndex: 0,
      pageCls: "item-pager",
      listRowCls: "list-item-row",
      listRowColFst: "col-3",
      listRowColSec: "col-7",
      listRowColThr: "col-2",
      itemSpinShow: false,
    };
  },
  methods: {
    ItemSelect(itemId) {
      const { href } = this.$router.resolve({
        name: "ItemDetail",
        params: {
          id: itemId,
        },
      });
      window.open(href, "_blank");
    },
    initPage() {
      // console.log("initPage");
      let self = this;
      self.listitemCount = self.items.length;
      // If the total number of items is less than the page size, use all data directly; otherwise slice the first page worth
      if (self.listitemCount < self.pageSize) {
        self.historyListitem = self.items;
      } else {
        self.historyListitem = self.items.slice(0, self.pageSize);
      }
    },
    pageChange(pageIndex) {
      // console.log("pageChange:" + pageIndex + "---");
      // pageIndex page index
      let self = this;
      let _start = (pageIndex - 1) * self.pageSize;
      let _end = pageIndex * self.pageSize;
      self.historyListitem = self.items.slice(_start, _end);
      self.CurrentPageIndex = pageIndex;
    },
  },
  computed: {
    showTemplate() {
      let self = this;
      !self.active.includes(self.showStyle) && self.active.push(self.showStyle);
      return self.showStyle;
    },
  },
  watch: {
    items() {
      // console.log("watch items change");
      let self = this;
      // console.log("spin true");
      self.itemSpinShow = true;
      self.initPage();
      self.pageChange(1);
      // console.log("spin false");
      setTimeout(() => (self.itemSpinShow = false), 800);
    },
    pageSize() {
      // console.log("watch pageSize change");
      let self = this;
      self.initPage();
      self.pageChange(1);
    },
  },
};
</script>

<style scoped>
.spin-container {
  min-height: 200px;
  display: block;
  position: relative;
}

.item {
  position: relative;
  /* margin-bottom: 16px; */
}

.discount {
  position: absolute;
  top: -1px;
  right: 0;
}

.discount-btn {
  background-color: #f5ff2e;
  border-radius: 3px;
  border: 1.24px solid #f5ff2e;
  color: #ff0000;
  font-weight: 600;
}

.discount-popper {
  font-size: 14px;
}

.price {
  color: red;
  font-weight: 600;
}

.list {
  padding: 16px 0;
}

img {
  width: 100%;
}

.item-pager {
  text-align: center;
}

.list-item-wrapper {
  padding: 16px 0;
}

.list-item-row {
  padding: 8px 16px;
  border-bottom: 1px solid #dcdee2;
}

.list-item-row .col-3 {
  padding-top: 16px;
  padding-bottom: 10px;
  padding-right: 16px;
  cursor: pointer;
}

.net-weight {
  font-weight: 600;
  color: blue;
}

.grid-item {
  padding: 8px;
}
</style>
