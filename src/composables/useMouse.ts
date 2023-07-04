import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    const { pageX, pageY } = event
    x.value = pageX
    y.value = pageY
  })

  return { x, y }
}
