<template>
<div class="news-wrapper">
    <Card :bordered="false" dis-hover>
        <h1 slot="title"><Icon type="md-paper-plane"></Icon> {{header}}</h1>
        <p>
            <ul class="list">
                <li v-for="(item, index) in news" :key="index">
                    <div class="content" @click.prevent="$emit('onNewsSelect', item)">
                        <Tag
                        :color="tagColor(tag)"
                        v-for="(tag, tagIndex) in item.tags" 
                        :key="tagIndex">{{tagText(tag)}}</Tag>
                        <div class="title">{{item.title}}</div>
                    </div>
                    <div class="time">{{item.date}} {{item.time}}</div>
                </li>
            </ul>
        </p>
    </Card>
</div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      header: "最新消息",
      news: [
        {
          tags: [1],
          img_url: require("../assets/image/825x400-1.png"),
          title:
            "【公告】芒果期進入尾聲了,芒果僅剩最後3周～特賣活動開跑,大家快來購買~!!",
          desc: "lorem",
          date: "2016/07/01",
          time: "12:00",
        },
        {
          tags: [2],
          img_url: require("../assets/image/825x400-2.png"),
          title: "【公告】愛文芒果開放預購囉～優先下單優先出貨！",
          desc: "lorem",
          date: "2016/05/06",
          time: "12:00",
        },
        {
          tags: [],
          img_url: require("../assets/image/825x400-3.png"),
          title: "【轉知】111年度本會「智慧農業業界參與補助計畫」補助申請公告",
          desc: "lorem",
          date: "2015/12/27",
          time: "12:00",
        },
        {
          tags: [],
          img_url: require("../assets/image/825x400-1.png"),
          title: "【轉知】春節送禮優惠活動",
          desc: "lorem",
          date: "2015/12/27",
          time: "12:00",
        },
        {
          tags: [],
          img_url: require("../assets/image/825x400-2.png"),
          title:
            "【轉知】「110年臺灣鳳梨海外拓銷獎勵計畫作業規範」自本年8月15日起調整獎勵措施基準",
          desc: "<div><p>一、為防範新冠肺炎持續影響鳳梨外銷，以及中國大陸自本(110)年3月1日起暫停臺灣鳳梨輸陸，對我鳳梨果品外銷造成重大影響，為協助產業發展，穩定國內產銷，評估有提振外銷之必要，本會爰規劃辦理旨案，並訂定「110年臺灣鳳梨海外拓銷獎勵計畫作業規範」(如附件)。</p><p>二、鑒於本年已至主要外銷品種金鑽鳳梨產季末期，自本年8月15日起調整獎勵措施基準，說明如次：</p><p>(一)獎補助對象：我國合法設立並具有進出口資格之外銷業者。</p><p>(二)獎補助項目：國產鳳梨鮮果實，稅則號列08043010000。</p><p>(三)補助期間：本年3月1日起至12月20日止。</p><p>(四)受理單位：財團法人中國生產力中心 (下稱生產力中心)。</p><p>聯繫專線：(02)2698-2380、電子郵件信箱：cpcagriexport@gmail.com、收件地址：22101新北市汐止區新台五路一段79號2樓，信封正面請註明「110年臺灣鳳梨海外拓銷獎勵計畫」及「寄件單位」。</p>",
          date: "2015/12/27",
          time: "12:00",
        },
      ],
    };
  },
  methods: {
    tagColor(tag) {
      let tagColor = "";
      switch (tag) {
        case 1:
          tagColor = "error";
          break;
        case 2:
          tagColor = "primary";
          break;
        default:
          tagColor = "default";
          break;
      }
      return tagColor;
    },
    tagText(tag) {
      let tagText = "";
      switch (tag) {
        case 1:
          tagText = "限時";
          break;
        case 2:
          tagText = "抽獎";
          break;
        default:
          tagText = "其他";
          break;
      }
      return tagText;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/variable.less";
@import "../assets/less/extend.less";

.news-wrapper {
  .list {
    list-style-type: none;
  }

  .list li:extend(.flex-div-space_between-center) {
    margin: 10px 0;
    padding-bottom: 8px;
    border-bottom: 1px dashed var(--list-dash-border-color);
  }

  .title {
    //TODO: too much text
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: @news-list-font-size;
  }

  .time {
    font-size: @news-time-font-size;
  }

  .content:extend(.flex-div-left-center) {
    color: var(--link-color);
    cursor: pointer;

    & :hover {
      color: var(--link-hover-color);
    }
  }
}
</style>
