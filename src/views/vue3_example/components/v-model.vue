<script setup lang="ts">
// 定义props及其类型
interface Props {
  firstName?: string | number | boolean | any
  lastName?: string | number | boolean | any
  firstNameModifiers?: any
  lastNameModifiers?: any
}

const props = withDefaults(defineProps<Props>(), {
  firstName: 'lucy',
  lastName: 'kity',
  modelModifiers: {},
})

// 定义事件
const emits = defineEmits<{
  (e: 'update:firstName', firstName: any): void
  (e: 'update:lastName', lastName: any): void
}>()

// firstName 输入事件
function inputFirstName(event: Event) {
  // 使用类型断言获取类型
  let value = (event.target as HTMLInputElement).value
  // 自定义修饰符，首字母大写
  if (props.firstNameModifiers.capitalize) {
    value = `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }
  // 抛出事件
  emits('update:firstName', value)
}

// lastName 输入事件
function inputLastName(event: Event) {
  // 使用类型断言获取类型
  let value = (event.target as HTMLInputElement).value
  // 自定义修饰符，首字母大写
  if (props.lastNameModifiers.capitalize) {
    value = `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }
  // 抛出事件
  emits('update:lastName', value)
}
</script>

<template>
  <div>
    <input type="text" :value="props.firstName" @input="inputFirstName">
    <input type="text" :value="props.lastName" @input="inputLastName">
  </div>
</template>
