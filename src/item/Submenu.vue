<template lang="pug">
Menu(
  mode="horizontal",
  :theme="theme1",
  active-name="1",
  accordion,
  @on-select="menuSelect"
)
  MenuItem(name="1") 熱銷排序
  MenuItem(name="2") 新品排序
  Submenu(name="3")
    template(slot="title")
      Icon(:type="priceIcon")
      | 價格
    MenuItem(name="3-1") 低至高
      Icon(type="md-arrow-round-up")
    MenuItem(name="3-2")
      | 高至低
      Icon(type="md-arrow-round-down")
  //- show style
  RadioGroup(
    v-model="style",
    type="button",
    size="small",
    @on-change="radioSelect"
  )
    Radio(:label="1", value="grid")
      Icon(type="md-grid")
    Radio(:label="2", value="list")
      Icon(type="md-list")
  //- number of items showed on a page
  Dropdown(:style="{ marginLeft: '20px' }", @on-click="dropdownSelect")
    a(href="javascript:void(0)")
      | 顯示: {{ dropdown.number }} 項
      Icon(type="ios-arrow-down")
    DropdownMenu(slot="list")
      DropdownItem(
        v-for="(item, index) in dropdown.data",
        :key="index",
        :name="item.name",
        :selected="item.selected"
      )
        | {{ item.value }} 項
</template>

<script>
export default {
  props: {
    showStyle: {
      type: Number,
    },
  },
  data() {
    return {
      style: this.showStyle,
      theme1: "light",
      priceIcon: "md-funnel",
      dropdown: {
        data: [
          {
            name: "4-1",
            value: 2,
            selected: true,
          },
          {
            name: "4-2",
            value: 4,
            selected: false,
          },
          {
            name: "4-3",
            value: 6,
            selected: false,
          },
        ],
        number: "6",
      },
    };
  },
  created() {
    // let self = this
    // self.theme1 = 'light'
    // self.priceIcon = 'md-funnel'
  },
  methods: {
    menuSelect(selectId) {
      let self = this;
      if (selectId === "3-1") {
        self.priceIcon = "md-arrow-round-up";
      } else if (selectId === "3-2") {
        self.priceIcon = "md-arrow-round-down";
      } else {
        self.priceIcon = "md-funnel";
      }
      self.$emit("onSubmenuSelect", selectId); // => Content => ListItem
    },
    radioSelect(selectValue) {
      // console.log(selectValue)
      this.$emit("onRadioSelect", selectValue); // => Content => ListItem
    },
    dropdownSelect(selectId) {
      // console.log(selectId);
      let self = this;
      self.dropdown.data = self.dropdown.data.map((el) => {
        let obj = {
          name: el.name,
          value: el.value,
          selected: false,
        };
        if (el.name === selectId) {
          obj.selected = true;
          self.dropdown.number = el.value;
        }
        return obj;
      });
      self.$emit("onDropdownSelect", self.dropdown.number); // => Content => ListItem
    },
  },
};
</script>

<style scoped>
</style>
