import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutDefault.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue'),
      }
    ]


  },
  {
    path: '/login',
    component: () => import('@/layouts/LayoutDefault.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Login.vue'),
      }
    ]
  }
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
