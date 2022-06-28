<template>
  <div class="home">
    <n-button type="success">点我啊！</n-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { NButton } from 'naive-ui'
@Options({
  components: {
    NButton
  }
})
export default class HomeView extends Vue {}
</script>
