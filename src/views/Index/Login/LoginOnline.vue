<template>
  <n-card content-style="padding: 0;" hoverable>
    <n-tabs
      type="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="登录"> 登录 </n-tab-pane>
      <n-tab-pane name="注册">
        <RegisterUser /> </n-tab-pane
    ></n-tabs>
  </n-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { NButton, NCard, NTabs, NTabPane } from 'naive-ui'
import RegisterUser from '@/components/Index/Register/RegisterUser.vue'
@Options({
  components: {
    NButton,
    NCard,
    NTabs,
    NTabPane,
    RegisterUser
  }
})
export default class LoginOnline extends Vue {}
</script>
