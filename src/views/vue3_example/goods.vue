<script setup lang="ts">
import { reactive } from 'vue'
import type { Ref } from 'vue'
import { useGetTableHeight } from './combinatorialFunction/getTableHeight'

// form 类型
interface Form {
  shopIds: Array<number | string> | string
  date: Date | string
  name: string
}
//  类型
interface Shop {
  id: number
  label: string
  value: number
  obj?: object
}

const formInline: Form = reactive({ shopIds: '', date: '', name: '' })
const shopOptions: Array<Shop> = [
  { id: 1, label: '店铺1', value: 1 },
  { id: 2, label: '店铺2', value: 2 },
  { id: 3, label: '店铺3', value: 3 },
]

let columns: ReturnType<typeof generateColumns> = reactive([])
let data: ReturnType<typeof generateData> = reactive([])
const loading: Ref<boolean> = ref(false)

function generateColumns(length = 10, prefix = 'column-', props?: any) {
  return Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))
}

function generateData(
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-',
) {
  return Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      },
    )
  })
}

function onSearch() {
  loading.value = true
  setTimeout(() => {
    columns = generateColumns(30)
    data = generateData(columns, 1000)
    // eslint-disable-next-line no-console
    console.log(columns)
    // eslint-disable-next-line no-console
    console.log(data)
    loading.value = false
  }, 2000)
}

const table = ref(null)
const mTableHeight = ref(0)

onMounted(() => {
  const dom = table.value as HTMLElement | null
  if (dom) {
    const aaa = useGetTableHeight(dom, 40)

    // watchEffect(() => {
    //   mTableHeight.value = aaa.value
    // })

    watch(
      () => aaa.value,
      (newVal) => {
        mTableHeight.value = newVal
      },
      {
        immediate: true, // 初始化之前就监听
      },
    )

    // 强制刷新视图
    // const { ctx } = getCurrentInstance() as any
    // ctx.$forceUpdate()
  }
})
</script>

<template>
  <page-main>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="店铺">
        <el-select v-model="formInline.shopIds">
          <el-option
            v-for="item in shopOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="日期">
        <el-input v-model="formInline.name" placeholder="请输入名称" />
      </el-form-item>
    </el-form>

    <el-button @click="onSearch">
      查询
    </el-button>
    <span>表格高度为：{{ mTableHeight }}</span>

    <div>
      <div ref="table" :style="{ height: `${mTableHeight}px` }">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              v-loading="loading"
              :columns="columns"
              :data="data"
              :width="width"
              :height="height"
              fixed
            />
          </template>
        </el-auto-resizer>
      </div>
    </div>
  </page-main>
</template>
