import type { RouteRecordRaw } from 'vue-router'

function layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/vue3_example',
  component: layout,
  name: 'vue3Example',
  meta: {
    title: 'vue3',
    icon: 'sidebar-breadcrumb',
  },
  children: [
    {
      path: 'base',
      name: 'baseExample',
      component: () => import('@/views/vue3_example/base.vue'),
      meta: {
        title: '基础示例',
      },
    },
    {
      path: 'deep',
      name: 'deepExample',
      component: () => import('@/views/vue3_example/deep.vue'),
      meta: {
        title: '深入示例',
      },
    },
    {
      path: 'goods',
      name: 'goods',
      component: () => import('@/views/vue3_example/goods.vue'),
      meta: {
        title: '商品利润分析',
      },
    },
  ],
}

export default routes
