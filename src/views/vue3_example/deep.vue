<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useUser } from '../../store/pinia-test/user'
import VModel from './components/v-model.vue'
import { useMouse } from './combinatorialFunction/move'

interface AllName {
  firstName: any
  lastName: any
}

const allName: AllName = reactive({ firstName: 'tom', lastName: 'lucy' })

const mName = computed(() => {
  return `${allName.firstName}-${allName.lastName}`
})

const { x, y } = useMouse()

const store = useUser()
</script>

<template>
  <div>
    <page-main>
      <span>{{ mName }}</span>
      <VModel v-model:first-name.capitalize="allName.firstName" v-model:last-name.capitalize="allName.lastName" />
      <span>{{ x }}-{{ y }}</span>
      <el-button @click="store.increment">
        {{ store.count }}
      </el-button>
      <el-button @click="store.$reset()">
        重置Pinia-Store
      </el-button>
    </page-main>
  </div>
</template>
