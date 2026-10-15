<template>
  <!-- v-modal 改為 :value -->
  <Modal
    class="modal"
    class-name="vertical-center-modal"
    :value="modal"
    :loading="modalLoading"
    @on-ok="submitOrder"
    @on-cancel="closeModal"
    ok-text="確認"
    cancel-text="取消"
  >
    <div slot="header">
      <h2>
        填寫收件人訂單資訊<Button
          @click="example"
          style="margin-left: 5px"
          size="small"
          >TEST Only</Button
        >
      </h2>
      <div class="memo">＊此功能僅供專案展示，請勿填寫真實資訊。</div>
    </div>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      label-position="right"
    >
      <Row class="row" :gutter="20" type="flex" justify="center">
        <Col span="11">
          <FormItem label="姓名" prop="name">
            <Input
              :class="inputClass"
              v-model="formValidate.name"
              placeholder="王大明"
            ></Input>
            <div :class="plainClass">
              {{ formValidate.name }}
            </div>
          </FormItem></Col
        >
        <Col span="11"
          ><FormItem label="行動電話" prop="phone">
            <Input
              :class="inputClass"
              v-model="formValidate.phone"
              placeholder="0912****78"
            ></Input>
            <div :class="plainClass">
              {{ formValidate.phone }}
            </div>
          </FormItem></Col
        ></Row
      >
      <Row class="row" :gutter="20" type="flex" justify="center">
        <Col span="11">
          <FormItem label="郵遞區號" prop="code">
            <Input
              :class="inputClass"
              v-model="formValidate.code"
              placeholder="100230"
            ></Input>
            <div :class="plainClass">
              {{ formValidate.code }}
            </div>
          </FormItem></Col
        >
        <Col span="11">
          <FormItem label="電子郵件" prop="mail">
            <Input
              :class="inputClass"
              v-model="formValidate.mail"
              placeholder="apple***@mail.com.tw"
            ></Input>
            <div :class="plainClass">
              {{ formValidate.mail }}
            </div>
          </FormItem></Col
        >
      </Row>
      <Row class="row" type="flex" justify="center">
        <Col span="22">
          <FormItem label="收件地址" prop="address">
            <Input
              :class="inputClass"
              v-model="formValidate.address"
              placeholder="〇〇市〇〇區〇〇路〇號"
            ></Input>

            <div :class="plainClass">
              {{ formValidate.address }}
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="22">
          <FormItem label="給店家的備註" prop="desc">
            <Input
              :class="inputClass"
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
            ></Input>
            <div :class="plainClass">
              {{ formValidate.desc }}
            </div>
          </FormItem>
        </Col></Row
      >
      <Divider>交易明細</Divider>
      <p class="detail">
        合計：<span class="red-text-color">NT$ {{ price }}</span>
      </p>
      <p class="detail">交易方式：ATM轉帳</p>
    </Form>
  </Modal>
</template>

<script>
export default {
  props: ["modal", "price"],
  data() {
    return {
      inputStatus: true,
      plainStatus: false,
      modalLoading: true,
      formValidate: {
        name: "",
        phone: "",
        code: "",
        address: "",
        mail: "",
        desc: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "請填寫姓名",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "請填寫行動電話",
            trigger: "blur",
          },
          {
            pattern: /^09\d{8}$/,
            message: "行動電話格式不正確",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "請填寫郵遞區號",
            trigger: "blur",
          },
          {
            pattern: /^(\d{3}){1,2}$/,
            message: "郵遞區號格式不正確（應為3或6碼）",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "請填寫地址",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "請填寫電子信箱",
            trigger: "blur",
          },
          { type: "email", message: "電子信箱格式不正確", trigger: "blur" },
        ],
        desc: [
          {
            required: false,
            message: "",
            trigger: "blur",
          },
          {
            type: "string",
            max: 150,
            message: "輸入請勿超過150字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    example() {
      this.formValidate = {
        name: "王大明",
        phone: "0912345678",
        code: "330111",
        address: "桃園市桃園區大有路123號",
        mail: "testonly@vi.com.tw",
        desc: "能否貨到的時用手機聯絡，感謝!",
      };
    },
    changeLoading() {
      this.modalLoading = false;
      // Reset loading state to true the next time the module mounts
      this.$nextTick(() => {
        this.modalLoading = true;
      });
    },
    submitOrder() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.inputStatus = false;
          this.plainStatus = true;
          this.$Message.success("感謝您的訂購，這是您的訂單資訊!");
        } else {
          this.$Message.error("非常抱歉，訂單內容資料未齊全或格式不正確!");
        }
        this.changeLoading();
      });
    },
    closeModal() {
      this.inputStatus = true;
      this.plainStatus = false;
      this.$refs.formValidate.resetFields();
      this.$emit("close");
    },
  },
  computed: {
    inputClass() {
      return { hide: !this.inputStatus };
    },
    plainClass() {
      return { hide: !this.plainStatus, show: this.plainStatus };
    },
  },
};
</script>

<style lang="less"scoped>
/deep/ .vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
.red-text-color {
  color: var(--red-color);
}
.row {
  margin: 10px 0;
}
.memo:extend(.red-text-color) {
  margin-top: 10px;
}
.detail {
  font-size: 1.3rem;
}
.hide {
  display: none;
}
.show {
  display: block;
  position: absolute;
  top: 2rem;
  left: 0;
  font-weight: 700;
  color: var(--text-color);
}
</style>