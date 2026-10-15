<template>
  <div class="dialog-wrapper" :class="{ open: is_open }">
    <div class="overlay" @click="close"></div>
    <div class="dialog">
      <div class="dialog-control">
        <slot name="control"><!-- 控制項 --></slot>
      </div>
      <div class="dialog-header">
        <slot name="header"><!-- 標題列 --></slot>
      </div>
      <div class="dialog-content">
        <slot><!-- 內容 --></slot>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/dialog.less";
///TODO: switch dialog scroll to use iview
export default {
  data() {
    return {
      is_open: false,
    };
  },
  methods: {
    open() {
      if (!this.is_open) {
        this.$emit("dialogOpen");
      }
      this.is_open = true;
    },
    close() {
      if (this.is_open) {
        this.$emit("dialogClose");
      }
      this.is_open = false;
    },
  },
};
</script>

<style>
</style>