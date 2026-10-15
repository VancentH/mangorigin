<template>
  <div class="order">
    <div class="wrapper">
      <Divider><h2>訂單摘要</h2></Divider>
      <Table
        class="table"
        size="small"
        border
        :columns="columns"
        :data="orderList"
      >
      </Table>
      <div class="summary">
        <div>總計：</div>
        <div class="price">NT$ {{ cartOrderTotal }}</div>
      </div>
      <Divider></Divider>
      <Button
        @click="orderModal = true"
        class="btn-checkout"
        type="success"
        long
        >結 帳</Button
      >
    </div>
    <OrderModal
      :modal="orderModal"
      :price="cartOrderTotal"
      @close="orderModal = false"
    ></OrderModal>
  </div>
</template>

<script>
import OrderModal from "./OrderModal.vue";
import { mapGetters } from "vuex";
export default {
  components: { OrderModal },
  data() {
    return {
      orderModal: false,
      columns: [
        {
          title: "品名",
          key: "name",
          minWidth: 180,
        },
        {
          title: "數量",
          key: "quantity",
          minWidth: 15,
        },
        {
          title: "價格",
          key: "price",
          minWidth: 30,
        },
        {
          title: "運費",
          key: "freight",
          minWidth: 30,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "cartItems",
      "cartFreight",
      "cartTotal",
      "cartOrderTotal",
      "cartQuantity",
    ]),
    orderList() {
      let self = this;
      let totalQuantity = 0;
      let orderList = self.cartItems.map((item) => {
        totalQuantity += item.quantity;
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
          freight: item.freight * item.quantity,
        };
      });
      orderList.push({
        name: "小計",
        quantity: totalQuantity,
        price: self.cartTotal,
        freight: self.cartFreight,
      });
      return orderList;
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
}
.wrapper {
  flex-basis: 35em;
}
.summary {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
}
.price {
  color: red;
}
.table /deep/ tr:last-child {
  font-weight: 700;
}
</style>