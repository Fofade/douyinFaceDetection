<template>
  <div></div>
</template>

<script >
import { useMessage } from 'naive-ui'
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'MessageApi',
  props: {},
  setup () {
    const ctx = getCurrentInstance()
    if (ctx) {
      const message = useMessage()
      ctx.appContext.config.globalProperties.$message = message
      window.$message = message
    }
  }
})
</script>
