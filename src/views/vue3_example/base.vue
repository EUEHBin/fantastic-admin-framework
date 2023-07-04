<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import MBtn from './components/clickBtns.vue'

// 定义响应式对象
const state = reactive({ count: 0 })
const author = reactive({
  name: 'tom',
  books: ['book1', 'book2', 'book3'],
})

// 定义响应式变量
const num = ref(0)

// 计算属性
const booksMsg = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

// 对响应式值修改
function increment() {
  state.count++
  num.value++
  author.books
    = num.value % 2 === 0 ? (author.books = ['books']) : (author.books = [])
}

// 生命周期
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log('the component is now onMounted')
})

// watch
const question = ref('')
const answer = ref('the answer is')

watch(question, (newValue, oldValue) => {
  answer.value = `the answer is ${newValue}...`
}, { deep: true, immediate: true })

// ref
const input = ref(null)
onMounted(() => {
  input?.value?.focus()
})

function mBtnChange(id: number) {
  // eslint-disable-next-line no-console
  console.log({ id })
}

function mBtnUpdate(value: string) {
  // eslint-disable-next-line no-console
  console.log({ value })
}
</script>

<template>
  <div>
    <page-main>
      <div class="block">
        <el-button @click="increment">
          {{ state.count }}_{{ num }}
        </el-button>
        <span>{{ booksMsg }}</span>
      </div>

      <div class="block">
        <el-input ref="input" v-model="question" />
        <span>{{ answer }}</span>
      </div>

      <div class="block">
        <MBtn @change="mBtnChange" @update="mBtnUpdate" />
      </div>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.block {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
}
</style>
