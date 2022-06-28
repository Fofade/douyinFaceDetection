<template>
  <!-- <n-card title="" hoverable>
    <template #cover v-if="">
      <img src="">
    </template>
  </n-card> -->
  1
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { NCard } from 'naive-ui'

@Options({
  props: {
    hasImg: {
      type: Boolean,
      default: false
    }, // 是否有图片
    imgUrl: {
      type: String,
      default: ''
    }, // 图片链接
    title: {
      type: String,
      default: '标题'
    }, // 标题
    text: {
      type: String,
      default: '内容'
    } // 文字
  },
  components: {
    NCard
  }
})
export default class Card extends Vue {}
</script>
<style scoped>
.n-card {
  max-width: 300px;
}
</style>
