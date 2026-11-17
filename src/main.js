import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router.js'
const app = createApp(App)

app.use(router) // Đăng ký router
app.mount('#app')
