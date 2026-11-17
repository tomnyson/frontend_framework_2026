import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Collection from './views/Collection.vue'
import ProductDetail from './views/ProductDetail.vue'

// Định nghĩa các routes
const routes = [
  { path: '/', component: Home },
  { path: '/collection', component: Collection },
  {path: '/product/:id', component: ProductDetail}
]

// Khởi tạo router
const router = createRouter({
  history: createWebHistory(), // Sử dụng HTML5 history mode (không có dấu # trên URL)
  routes,
})

export default router