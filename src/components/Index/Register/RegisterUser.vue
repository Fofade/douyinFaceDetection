<template>
  <n-form
    ref="formRef"
    :model="registerUser"
    :rules="registerRules"
    size="large"
    label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="4" label="用户名" path="username">
        <n-input v-model:value="registerUser.username" placeholder="用户名" />
      </n-form-item-gi>
      <n-form-item-gi :span="4" label="密码" path="password">
        <n-input v-model:value="registerUser.password" placeholder="密码" />
      </n-form-item-gi>
      <n-form-item-gi :span="4" label="邮箱" path="email">
        <n-input v-model:value="registerUser.email" placeholder="邮箱" />
      </n-form-item-gi>
      <n-form-item-gi :span="4" label="验证码" path="iCode">
        <n-input v-model:value="registerUser.iCode" placeholder="验证码" />
      </n-form-item-gi>
      <n-form-item-gi :span="4" label="邮件验证码" path="eCode">
        <n-input v-model:value="registerUser.eCode" placeholder="邮件验证码" />
      </n-form-item-gi>
    </n-grid>
    <n-button @click="Register"> 注册</n-button>
    <n-button id="SendCode"> 发验证码</n-button>
  </n-form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NButton, NForm, NGrid, NFormItemGi, NInput } from "naive-ui";
@Options({
  components: {
    NButton,
    NForm,
    NGrid,
    NFormItemGi,
    NInput,
  },
})
export default class RegisterUser extends Vue {
  /**
   * 注冊用戶
   */
  registerUser = {
    username: "",
    password: "",
    email: "",
    iCode: "",
    eCode: "",
  };

  /**
   * 注册表单规则
   */
  registerRules = {
    username: {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入 用户名",
    },
    password: {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入 密码",
    },
  };

  /**
   * 挂载前
   */
  mounted() {
    // 获取图片二维码
  }

  SendCode() {
    // 发送邮件二维码
  }

  Register() {
    // 提交表单
    // eslint-disable-next-line no-undef
    $autojs.invoke("show-log");
  }
}
</script>
