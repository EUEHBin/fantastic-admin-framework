<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string | number
  content?: string
}
// 声明props并设置默认值
const props = withDefaults(defineProps<Props>(), {
  title: 10086,
  content: 'good good study',
})

// 声明事件 e:事件名称、id:该事件的参数
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

const count = ref<number>(0)
function insert() {
  count.value++
  emit('change', 1)
  emit('update', '111111111')
}
</script>

<template>
  <span>{{ props.title }} - {{ props.content }}</span>
  <el-button @click="insert">
    {{ count }}
  </el-button>
</template>

<style lang="scss" scoped>
.btn {
  background-color: green;
}
</style>
