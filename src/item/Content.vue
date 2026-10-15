<template lang="pug">
div
  //- Category
  .categroy
    Card(
      @click.native="netWeightOnClick(item.oldData)",
      v-for="(item, index) in showWrapperText",
      :key="index",
      :class="[wrapCls, { active: item.active }]"
    )
      .label
        div {{ item.data }}
        p {{ item.label }}
  //- List
  .list
    submenu(
      @onSubmenuSelect="updateListItem($event)",
      @onRadioSelect="updateShowStyle($event)",
      @onDropdownSelect="updateDropdown($event)",
      :showStyle="showStyle"
    )
    list-item(
      :items="filterItems",
      :showStyle="showStyle",
      :pageSize="pageSize"
    )
</template>

<script>
import Submenu from "./Submenu";
import ListItem from "./ListItem";

// moment.js
const moment = require("moment");

export default {
  props: {
    wrapper: {
      type: Array,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      wrapCls: "wrap",
      orderby: "",
      netweight: "all",
      showStyle: 1,
      pageSize: 10,
    };
  },
  created() {
    // Handle URL display
    let self = this;
    const netweight = self.$route.query.netweight
      ? self.$route.query.netweight
      : null;
    if (netweight) {
      self.netweight = netweight; // trigger select method
    }
  },
  components: {
    Submenu,
    ListItem,
  },
  computed: {
    showWrapperText() {
      let self = this;
      if (self.wrapper.length) {
        let temp = self.wrapper.map((el, idx) => {
          let number = el.match(/\d+/g).map(Number);
          return {
            oldData: el,
            data: `${number}`,
            label: `裝箱${number}台斤`,
            active: el === self.netweight,
          };
        });
        const all = "all";
        temp.unshift({
          oldData: all,
          data: "-",
          label: "所有重量",
          active: all === self.netweight,
        });
        return temp;
      }
      return;
    },
    filterItems() {
      let self = this;
      let temp = [];

      if (self.items.length) {
        // console.log("filter & reorder");

        // net weight filter
        if (self.netweight === "all") {
          temp = self.items.slice();
        } else {
          temp = self.items.filter((el) => {
            // return el.netWeight.includes(self.netWeight);
            return el.netweight === self.netweight;
          });
        }

        // filter
        switch (self.orderby) {
          case "2":
            temp = self.orderByDate(temp); // date
            break;
          case "3-1":
            temp = self.orderByPriceUp(temp); // price-up
            break;
          case "3-2":
            temp = self.orderByPriceDown(temp); // price-down
            break;
          case "1":
          default:
            temp = self.orderBySell(temp); // sell
            break;
        }
        // add query param to url
        self.$router.replace({
          query: { ...this.$route.query, netweight: self.netweight },
        });
        return temp;
      }
    },
  },
  methods: {
    updateListItem(id) {
      this.orderby = id;
    },
    updateShowStyle(id) {
      this.showStyle = id;
    },
    updateDropdown(num) {
      // console.log(num);
      this.pageSize = num;
    },
    netWeightOnClick(item) {
      this.netweight = item;
    },
    orderBySell(items) {
      // console.log("orderBySell");
      return items.sort((a, b) => {
        // 25 - 20
        return b.number_of_items_sold - a.number_of_items_sold;
      });
    },
    orderByDate(items) {
      // console.log("orderByDate");
      return items.sort((a, b) => {
        // 2019-05-03 13:55:25
        return (
          new moment(b.date_added, "YYYY-MM-DD HH:mm:ss") -
          new moment(a.date_added, "YYYY-MM-DD HH:mm:ss")
        );
      });
    },
    orderByPriceUp(items) {
      // console.log("orderByPriceUp");
      return items.sort((a, b) => {
        return a.price - b.price;
      });
    },
    orderByPriceDown(items) {
      // console.log("orderByPriceDown");
      return items.sort((a, b) => {
        return b.price - a.price;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 120px;
  width: 120px;
  margin-right: 16px;
  display: inline-block;
  cursor: pointer;

  > div {
    text-align: center;
  }

  img {
    width: 100%;
  }
}

.wrap.active {
  border: 2px solid #2d8cf0;
  border-color: #2d8cf0;
}

.categroy {
  margin-bottom: 24px;
}

.label {
  text-align: center;
  div {
    font-size: 2.5rem;
  }
}
</style>
