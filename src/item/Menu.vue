<template lang="pug">
Menu(
  :active-name="activeMenu",
  :open-names="openMenus",
  theme="light",
  width="auto",
  @on-select="menuSelect"
)
  MenuGroup(:title="title")
    template(v-for="(cate, index) in category")
      //- length > 0
      Submenu(
        v-if="cate.category_children.length",
        :key="index",
        :name="cate.category_id"
      )
        template(slot="title")
          Icon(
            type="md-cube",
            :color="`var(--${cate.category_icon_color}-color)`"
          )
          | {{ cate.category_name }}
        template(v-if="cate.category_children")
          MenuItem(
            v-for="(cate_child, index) in cate.category_children",
            :key="index",
            :name="cate_child.category_id"
          ) {{ cate_child.category_name }}
      //- length == 0
      MenuItem(v-else, :key="index", :name="cate.category_id")
        Icon(type="md-cube", :color="otherColor")
        | {{ cate.category_name }}
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      otherColor: "",
      activeMenu: "",
      openMenus: [],
    };
  },
  created() {
    let self = this;
    self.title = "芒果種類";
    self.otherColor = "#24bb30c9";
    // Handle URL display
    const menu = self.$route.query.category ? self.$route.query.category : null;
    if (menu) {
      self.activeMenu = menu;
      self.openMenus = [String(menu.match(/^\d+/))]; // extract first number in params
      this.menuSelect(menu); // trigger select method
    }
  },
  methods: {
    menuSelect(selectId) {
      let self = this;
      let _selectCate = {
        category_id: "",
        level2: "",
        level3: "",
        netWeights: [],
      };
      self.category.some((el) => {
        if (el.category_id === selectId) {
          _selectCate.category_id = selectId;
          _selectCate.level2 = el.category_name;
          _selectCate.netWeights = el.netWeights.slice(0);
          return true;
        }
        return el.category_children.some((inner_el) => {
          if (inner_el.category_id === selectId) {
            _selectCate.category_id = selectId;
            _selectCate.level2 = el.category_name;
            _selectCate.level3 = inner_el.category_name;
            _selectCate.netWeights = inner_el.netWeights.slice(0);
            return true;
          }
        });
      });
      // add query param to url
      //TODO: handle manual click or link-based category change to reset all
      self.$router.replace({
        query: { ...this.$route.query, category: selectId },
      });
      self.$emit("onMenuSelect", _selectCate); // => index => breadcrumb
    },
  },
};
</script>

<style scoped>
</style>
