import { onUnmounted, ref } from 'vue'
import { debounce } from 'lodash-es'

function domPageTop(dom: HTMLElement) {
  let realTop = dom.offsetTop
  let parent = dom.offsetParent as HTMLElement | null
  while (parent !== null) {
    realTop += parent.offsetTop
    parent = parent.offsetParent as HTMLElement | null
  }

  return realTop
}

export function useTableHeight(dom: HTMLElement, offsetHeight: number, fixHeight: null | number = null) {
  const height = ref(0)

  if (fixHeight != null) {
    height.value = fixHeight
    return height
  }

  const heightCalculation = debounce(updated, 100)
  updated()

  function updated() {
    const tablePageTop = domPageTop(dom)
    const outerHeight = document.body.clientHeight
    height.value = outerHeight - tablePageTop - offsetHeight
  }

  window.addEventListener('resize', heightCalculation)
  onUnmounted(() => {
    window.removeEventListener('resize', heightCalculation)
  })

  return height
}
