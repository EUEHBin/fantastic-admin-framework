export function debounce(method: Function, wait: number, immediate = false) {
  let timeOut: number | null
  let result

  const debounced = (...args: Array<any>) => {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this, @typescript-eslint/no-this-alias
      const context: any = this

      if (timeOut) {
        clearTimeout(timeOut)
      }

      if (immediate) {
        const callNow = !timeOut
        timeOut = setTimeout(() => {
          timeOut = null
        }, wait)

        if (callNow) {
          result = method.apply(context, args)
          resolve(result)
        }
      }
      else {
        timeOut = setTimeout(() => {
          result = method.apply(context, args)
          resolve(resolve)
        }, wait)
      }
    })
  }
  return debounced
}
