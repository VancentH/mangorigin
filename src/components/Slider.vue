<template>
    <Carousel v-model="value"
        :height="height"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
        loop>
        <CarouselItem v-for="(slide, index) in slides" :key="index">
            <div class="carousel">
              <img :src="slide.url" :alt="slide.name">
            </div>
        </CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        props: {
          slides: {
            type: Array,
            default () {
              return []
            }
          }
        },
        data () {
            return {
                value: 0,
                height: '350px',
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: true,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        }
    }
</script>
<style scoped>
img {
  width: 100%;
}
</style>

