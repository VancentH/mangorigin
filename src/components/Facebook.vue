<template>
<div style="padding: 20px">
  Facebook
    <!-- <div class="fb-page" :data-href="url" :data-width="width" :data-hide-cover="hideCover" :data-show-facepile="showFacepile"></div>
    <div id="fb-root"></div> -->
</div>
</template>

<script>
export default {
    data() {
        return {
            url: 'https://www.facebook.com/NUK.im.welcome/',
            width: 340,
            hideCover: false,
            showFacepile: true
        }
    },
    mounted() {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}
</script>

<style scoped>
</style>
