<template>
  <div>
    <h1>商品內容</h1>
    <div class="container">
      <template v-if="productItem">
        <div class="top">
          <div class="image">
            <img
              :src="
                $utility.getImageSource(
                  productItem.image_id,
                  productItem.image_type
                )
              "
            />
          </div>
          <div class="control">
            <div class="main">
              <h2 class="name">{{ productItem.name }}</h2>
              <div class="price">
                <h1>${{ productItem.price }}元</h1>
                <span class="net-weight">
                  / {{ `${productItem.netweight}台斤` }}</span
                >
              </div>
              <p class="discount" v-if="productItem.discount_enable === 1">
                <Tag color="warning">{{
                  `活動 ${productItem.discount_content}`
                }}</Tag
                ><span class="description">
                  原價：<span class="price">${{ getOriginalPrice }}</span>
                </span>
              </p>
              <div class="detail">
                <div>水果數目：</div>
                <div>{{ productItem.count }} 顆/箱</div>
                <div>已售出：</div>
                <div>{{ productItem.number_of_items_sold }} 箱</div>
                <div>盛產期：</div>
                <div>
                  {{ `${productItem.peak_harvest_period}月` }}
                </div>
                <div>原產地：</div>
                <div>{{ productItem.location }}</div>
                <div>運費每箱：</div>
                <div class="freight">{{ productItem.freight }} 元</div>
              </div>
            </div>
            <Divider />
            <div class="button-wrapper">
              <Select v-model="quantity">
                <Option
                  v-for="item in boxList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Button @click="addToCart" type="success" long>加入購物車</Button>
            </div>
          </div>
        </div>
        <Divider></Divider>
        <div class="middle">
          <h2 class="title">商品規格</h2>
          <p class="content" v-html="productItem.desc"></p>
        </div>
        <div class="bottom">
          <h2 class="title">備註</h2>
          <p class="content">
            {{ productItem.other }}
          </p>
        </div>
      </template>
      <template v-else>
        <div>查無此商品</div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      quantity: 1,
      productItem: "",
    };
  },
  methods: {
    ...mapActions(["addCartItem"]),
    addToCart() {
      let {
        id,
        date_added,
        desc,
        peak_harvest_period,
        number_of_item_viewed,
        number_of_items_sold,
        ...newProductItem
      } = this.productItem;
      const productItem = {
        ...newProductItem,
        product_id: id,
        quantity: this.quantity,
      };
      this.addCartItem({ cart: productItem });
    },
  },
  computed: {
    // productItem() {
    //   return this.$store.getters.productItemById(this.$route.params.id);
    // },
    getOriginalPrice() {
      return Math.round(
        this.productItem.price / (this.productItem.discount_discount / 100),
        2
      );
    },
    boxList() {
      let list = [];
      for (let i = 1; i <= 10; i++) {
        list.push({
          value: i,
          label: `選購 ${i} 箱`,
        });
      }
      return list;
    },
  },
  created() {
    this.$api.product
      .getProductItemById({ productId: this.$route.params.id })
      .then((response) => {
        this.productItem = response.data;
      })
      .catch((error) => {
        this.$Message.error("商品內容載入失敗!");
      });
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/variable.less";
@import "../assets/less/extend.less";

.container {
  .top,
  .middle,
  .bottom {
    padding: 20px 0;
    margin: 20px 0;
  }
}

.top {
  display: flex;

  .image {
    width: 50%;
    align-self: center;

    img {
      width: clamp(200px, 80%, 450px);
      //min value, preferred value, max value
      border-radius: var(--border-radius);
    }
  }

  .currency {
    color: var(--second-color);
    font-size: 1.4rem;
  }

  .price h1 {
    display: inline;
    color: red;
  }
}

.control {
  width: 50%;
  .button-wrapper {
    display: flex;
    gap: 15px;
  }
}

.discount {
  .description {
    vertical-align: middle;
  }
  .price {
    text-decoration: line-through;
  }
}

.content {
  margin-top: 10px;
}
.net-weight {
  color: blue;
  font-weight: 700;
}

.detail {
  font-weight: @font-weight;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  .freight {
    color: blue;
    //TODO: refactor
  }
}

.main > div {
  margin: 10px 0;
}
</style>
