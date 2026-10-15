<template>
<Row class="diary-wrapper" :gutter="32">
    <Card :title="header" :bordered="false" padding="16px 0px" dis-hover>
        <h2 slot="title">{{header}}</h2>
        <i-col span="6" v-for="(item, id) in diary" :key="id">
            <div class="diary">
                <img :src="item.img_url" :alt="item.img_alt">
                <h3>{{item.title}}</h3>
                <p>{{item.desc}}</p>
                <Button type="text" icon="md-search" shape="circle"></Button>
                <router-link :to="{name: 'DiaryDetail', params: {id:item.id}}">繼續閱讀</router-link>
            </div>
        </i-col>
        <div style="clear:both"></div>
    </Card>
</Row>
</template>

<script>
export default {
    data() {
        return {
            header: '芒果成長日記',
            diary: [{
                    id: 1,
                    title: '颱風天過後的芒果原',
                    desc: '車果民開大明來易上界商。',
                    img_url: require('../assets/image/825x400-1.png'),
                    img_alt: 'alt',
                    likeCount: 10
                },
                {
                    id: 2,
                    title: '颱風天過後的芒果原',
                    desc: '車果民開大明來易上界商。',
                    img_url: require('../assets/image/825x400-1.png'),
                    img_alt: 'alt',
                    likeCount: 10
                },
                {
                    id: 3,
                    title: '颱風天過後的芒果原',
                    desc: '車果民開大明來易上界商。',
                    img_url: require('../assets/image/825x400-1.png'),
                    img_alt: 'alt',
                    likeCount: 10
                },
                {
                    id: 4,
                    title: '颱風天過後的芒果原',
                    desc: '車果民開大明來易上界商。',
                    img_url: require('../assets/image/825x400-1.png'),
                    img_alt: 'alt',
                    likeCount: 10
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.diary-wrapper {
    padding: 20px;

}

.diary img {
      border-radius: 3px;
  cursor: pointer;
  &:hover {
    opacity: .6;
     transition: all .4s ease-in-out;
  }
}

img {
    width: 100%;
}

div {
    /* background-color: aquamarine */
}
</style>
