<template>
  <div class="login">
    <Card :bordered="false" dis-hover style="width: 500px">
      <h1 slot="title" class="title">登入</h1>
      <Form ref="loginForm" :model="loginForm" :rules="loginFormRules">
        <FormItem prop="pid" label="身分證字號">
          <Input
            v-model="loginForm.pid"
            placeholder="請輸入您的身分證字號"
          ></Input>
        </FormItem>
        <FormItem prop="pin" label="PIN碼">
          <Input
            type="password"
            v-model="loginForm.pin"
            placeholder="請輸入您的PIN碼"
          ></Input>
        </FormItem>
        <FormItem>
          <div>＊請使用讀卡機及憑證，並輸入PIN碼進行驗證。</div>
        </FormItem>
        <FormItem>
          <Row :gutter="20" type="flex" justify="space-between">
            <Col span="12">
              <Button long type="primary" @click="reset">清除</Button></Col
            >
            <Col span="12">
              <Button long type="success" @click="submit">登入</Button></Col
            ></Row
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        pid: "",
        pin: "",
      },
      loginFormRules: {
        pid: [
          {
            required: true,
            message: "請輸入身分證字號",
            trigger: "blur",
          },
        ],
        pin: [
          {
            required: true,
            message: "請輸入PIN碼",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginForm.resetFields();
    },
    submit() {
      // console.log("submit");
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // this.$Message.success("Success!");
        } else {
          // this.$Message.error("Please enter correctly!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  /deep/ label {
    font-size: 1.2rem;
  }
}
</style>
