import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useMouse() {
  const x: Ref<number> = ref(0)
  const y: Ref<number> = ref(0)

  function update(event: Event) {
    const { pageX, pageY } = event as MouseEvent
    x.value = pageX
    y.value = pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
