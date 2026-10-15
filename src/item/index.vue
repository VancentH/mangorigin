<template lang="pug">
Layout
  Content
    Layout
      //- Sidebar
      Sider(hide-trigger, :style="{ background: '#fff' }")
        side-menu(:category="category", @onMenuSelect="updateContent($event)")
      //- Content
      Content(:style="{ padding: '24px', minHeight: '300px' }")
        main-breadcrumb(:breadcrumb="breadcrumb")
        main-content(:wrapper="wrapper", :items="filterItems")
</template>

<script>
import SideMenu from "./Menu";
import MainBreadcrumb from "./Breadcrumb";
import MainContent from "./Content";

import { mapGetters } from "vuex";

export default {
  components: {
    SideMenu,
    MainBreadcrumb,
    MainContent,
  },
  data() {
    return {
      category: [
        {
          category_id: "1",
          category_name: "土芒果",
          category_icon_color: "green",
          category_children: [
            {
              category_id: "1_1",
              category_name: "特美",
              netWeights: ["3"],
            },
            {
              category_id: "1_2",
              category_name: "優良",
              netWeights: ["3"],
            },
          ],
        },
        {
          category_id: "2",
          category_name: "愛文芒果",
          category_icon_color: "orange",
          category_children: [
            {
              category_id: "2_1",
              category_name: "特美",
              netWeights: ["10"],
            },
            {
              category_id: "2_2",
              category_name: "特選",
              netWeights: ["10"],
            },
            {
              category_id: "2_3",
              category_name: "優級",
              netWeights: ["10"],
            },
          ],
        },
        {
          category_id: "3",
          category_name: "金煌芒果",
          category_icon_color: "yellow",
          category_children: [
            {
              category_id: "3_1",
              category_name: "特選",
              netWeights: ["5", "10"],
            },
            {
              category_id: "3_2",
              category_name: "優級",
              netWeights: ["5", "10"],
            },
          ],
        },
      ],
      breadcrumb: {
        root: "芒果種類",
        level2: "",
        level3: "",
      },
      wrapper: [],
      filterCategoryId: "",
    };
  },
  methods: {
    updateContent(category) {
      let self = this;
      // path
      self.breadcrumb.level2 = category.level2;
      self.breadcrumb.level3 = category.level3;
      // wrapper
      self.wrapper = category.netWeights;
      // content
      self.filterCategoryId = category.category_id;
    },
  },
  computed: {
    ...mapGetters(["productItems"]),
    filterItems() {
      let self = this;
      if (self.filterCategoryId) {
        return self.productItems.filter((el) => {
          return el.category === self.filterCategoryId;
        });
      }
    },
  },
  created() {
    this.$store.dispatch("getProductItems");
  },
};
</script>

<style scoped>
</style>
