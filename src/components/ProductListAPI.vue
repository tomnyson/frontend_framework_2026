<script setup>
import { ref, onMounted } from 'vue';
import apiService from '../api/api.js';
const isLoading = ref(false);
const products = ref([]);
onMounted(() => {
  // Fetch products when component is mounted
  console.log('Fetching products...');
  fetchProducts();
});

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await apiService.get('products');
    products.value = response.data;
    console.log('Products fetched:', products.value);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteProduct = (id) => {
  const hoi = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
  if (!hoi) {
    return; // Nếu người dùng chọn "Cancel", thoát khỏi hàm mà không xóa sản phẩm
  }
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
  }
}
</script>

<template>
  <div class="row">
    <h2>Danh sách sản phẩm</h2>
    <div v-show="isLoading" class="spinner-border" role="status">
    </div>
    <div class="col-md-3 mb-3" v-for="product in products" :key="product.id">
      <div class="card h-100">
        <img :src="product.hinh_anh" class="card-img-top" alt="Hình ảnh sản phẩm">
        <div class="card-body">
          <h5 class="card-title">{{ product.ten }}</h5>
          <p class="card-text">{{ product.mo_ta }}</p>
          <p class="card-text"><strong>Giá:</strong> {{ product.gia.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND' }) }}</p>
          <p class="card-text">
            <!-- <span style="color: red;" v-if="product.ton_kho<20">
                        <strong style="color: red;">Tồn kho:</strong> {{ product.ton_kho}}
                       </span>
                        <span v-else>
                        <strong>Tồn kho:</strong> {{ product.ton_kho}}
                       </span> -->
            <strong :class="{ blinksmooth: product.ton_kho < 20 }">Tồn kho: {{ product.ton_kho }} </strong> <br />
            <button class="btn btn-danger" @click="deleteProduct(product.id)">xóa sản phẩm</button>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.blinksmooth {
  /* Tên hiệu ứng | Thời gian 1 chu kỳ | Kiểu chuyển động | Lặp vô hạn */
  color: red;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1.8);
    opacity: 1;
  }

  to {
    transform: scale(1.5);
    opacity: 0.1;
  }
}
</style>