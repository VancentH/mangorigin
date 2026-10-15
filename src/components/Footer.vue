<template>
  <div class="footer">
    <div class="footer-top">
      <h2>相關連結</h2>
      <div class="social-media">
        <div>
          <a href="">
            <Button class="icon-facebook" icon="logo-facebook"></Button
          ></a>
        </div>
        <div>
          <a href=""
            ><Button class="icon-instagram" icon="logo-instagram"></Button
          ></a>
        </div>
        <div>
          <a :href="`mailto:${email}`">
            <Button class="icon-mail" icon="md-mail"> </Button
          ></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2021 <a :href="`mailto:${email}`">MangOrigin</a> made by Vincent.
    </div>
  </div>
</template>

<script>
//TODO: change button link
export default {
  data() {
    return {
      email: "hyde31456@gmail.com",
    };
  },
};
</script>

<style lang="less" scoped>
.socialBtn_hover(@bgColor:green) {
  background-color: @bgColor;
  color: #ffffff;
}

.footer {
  background: #d1dfe4;
  padding: 30px;
}
.social-media {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  div {
    margin: 0 5px;
  }

  button {
    background: #edf2f7;
    font-size: 24px;
    padding: 0 7px;
    border-radius: 3px;
    &:hover {
      border-color: transparent;
    }
    &.icon-facebook:hover {
      .socialBtn_hover(#3b5998);
    }
    &.icon-instagram:hover {
      .socialBtn_hover(#f52156);
    }
    &.icon-mail:hover {
      .socialBtn_hover();
    }
  }
}
</style>