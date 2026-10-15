<template>
  <div class="banner">
    <img :src="banner" alt="MangOrigin Cover" />
    <div class="title-text">
      <h1 class="text-black">芒果原 MangOrigin</h1>
      <h3 class="text-black">
        芒果原位在屏東縣來義鄉的山上,<br />芒果園的主人為原住民,
        用心的栽培出的芒果最美味!
      </h3>
    </div>
  </div>
</template>

<script>
//TODO: add an animation
export default {
  data() {
    return {
      banner: require("../assets/image/825x400-3.png"),
    };
  },
};
</script>

<style scoped>
.banner {
  margin: -25px -70px 20px -70px;
  position: relative;
}
.banner img {
  width: 100%;
  opacity: 0.8;
  object-fit: cover;
  object-position: top;
  border-style: none;
  border-radius: 0;
}
.title-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
  min-width: 500px;
  min-height: 250px;
  top: 50%;
  left: 50%;
  position: absolute;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  opacity: 0.7;
}
</style>
