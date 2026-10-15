<template>
  <List>
    <div class="header">
      <div>
        共有 <span>{{ cartQuantity }}</span> 項商品在您的購物車中。
      </div>
      <div class="reset">
        <Button type="error" @click="removeAll">清空購物車</Button>
      </div>
    </div>
    <div
      class="item"
      v-for="(item, index) in cartItems"
      :key="index"
      :data-id="item.id"
    >
      <div class="description">
        <div class="image">
          <a
            ><img
              :src="$utility.getImageSource(item.image_id, item.image_type)"
              width="100%"
              @click="itemSelect(item.product_id)"
          /></a>
        </div>
        <div class="content">
          <h2>
            <a @click.prevent="itemSelect(item.product_id)">{{ item.name }}</a>
          </h2>
          <p>{{ item.location }}</p>
          <p>{{ item.other }}</p>
        </div>
      </div>
      <div class="action">
        <div class="item-count">
          <Button
            type="text"
            icon="md-remove"
            @click="minus(item.id, item.quantity - 1)"
          />
          <div class="count">{{ item.quantity }}</div>
          <Button
            type="text"
            icon="md-add"
            @click="add(item.id, item.quantity + 1)"
          />
        </div>
      </div>
      <div class="extra">
        <div v-if="item.discount_enable === 1">
          原價：<span class="origin-price"
            >${{ getOriginalPrice(item.price, item.discount_discount) }}</span
          >
        </div>
        <div class="price">
          ${{ item.price
          }}<span class="type">{{ ` / 每箱${item.netweight}台斤` }}</span>
        </div>
        <div class="freight">${{ `${item.freight} / 每箱運費` }}</div>
        <div class="remove">
          <a @click="removeCartItem(item.product_id)">刪除</a>
        </div>
      </div>
    </div>
  </List>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions([
      "removeAllCartItems",
      "addCartItem",
      "removeCartItem",
      "updateCartItemsQty",
    ]),
    itemSelect(id) {
      const { href } = this.$router.resolve({
        name: "ItemDetail",
        params: {
          id: id,
        },
      });
      window.open(href, "_blank");
    },
    add(cartItemId, cartItemQty) {
      this.updateCartItemsQty({
        cartItemId,
        cartItemQty,
      });
    },
    minus(cartItemId, cartItemQty) {
      if (cartItemQty > 0) {
        this.updateCartItemsQty({
          cartItemId,
          cartItemQty,
        });
      }
    },
    removeAll() {
      this.$Modal.confirm({
        closable: true,
        cancelText: "取消",
        okText: "確定",
        onOk: () => {
          this.removeAllCartItems();
        },
        render: (h) => {
          return h("div", [
            h(
              "h2",
              { style: { textAlign: "center", marginTop: "15px" } },
              "刪除所有購物車內容?"
            ),
          ]);
        },
      });
    },
    getOriginalPrice(price, discount) {
      return Math.round(price / (discount / 100), 2);
    },
  },
  computed: {
    ...mapGetters(["cartItems", "cartTotal", "cartQuantity"]),
  },
};
</script>

<style lang="less">
@import "../assets/less/extend.less";

.header {
  display: flex;
  align-items: center;
  .reset {
    margin-left: auto;
  }
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #dcdee2;
  border-radius: 3px;
  gap: 10px;

  .description:extend(.flex-div-left-center) {
    gap: 20px;
    flex-basis: 25em;
    .image {
      width: 150px;
      padding: 5px;
      border-radius: var(--border-radius);
    }
    .content {
      font-size: 1rem;
    }
  }

  .item-count:extend(.flex-div-left-center) {
    border: 1px solid var(--button-border-color);
    border-radius: var(--border-radius);
    .count {
      margin: 0 15px;
    }
  }

  .extra {
    flex-basis: 13em;
    text-align: right;

    .origin-price {
      text-decoration: line-through;
    }
    .price {
      // word-break: keep-all;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .type {
      font-size: 1rem;
    }

    .remove a {
      font-size: 1rem;
      border-bottom: 1px dashed;
    }
  }
}
</style>