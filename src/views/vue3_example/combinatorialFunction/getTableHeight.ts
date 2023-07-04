import { onUnmounted, ref } from 'vue'
import { debounce } from 'lodash-es'

// 获取dom顶部距离
function domPageTop(dom: HTMLElement) {
  let realTop = dom.offsetTop
  let parent = dom.offsetParent as HTMLElement | null
  while (parent !== null) {
    realTop += parent.offsetTop
    parent = parent.offsetParent as HTMLElement | null
  }

  return realTop
}

export function useGetTableHeight(dom: HTMLElement, heightBuffer: number) {
  // 高度值
  const tableHeight = ref(0)
  // 计算高度方法，已防抖
  const methods = debounce(update, 100)
  window.addEventListener('resize', methods)
  // 初始化进行一次计算
  update()
  // 高度计算
  function update() {
    // eslint-disable-next-line no-console
    console.log('updateupdateupdateupdateupdate')
    const tablePageTop = domPageTop(dom)
    const outerHeight = document.body.clientHeight
    tableHeight.value = outerHeight - tablePageTop - heightBuffer
  }

  onUnmounted(() => {
    window.removeEventListener('resize', methods)
  })

  return tableHeight
}
