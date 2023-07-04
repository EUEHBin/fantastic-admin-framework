import { onBeforeUnmount, onMounted } from 'vue'

// 注册事件的组合式函数
export function useEventListener(target: any, event: string, callBack: Function) {
  onMounted(() => {
    target.addEventListener(event, callBack)
  })

  onBeforeUnmount(() => {
    target.removeEventListener(event, callBack)
  })
}
