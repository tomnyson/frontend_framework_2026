<script setup>
import { ref, onMounted, reactive } from 'vue';
import apiService from '../api/api.js';
const isLoading = ref(false);
const products = ref([]);
const product=reactive({
  id: '',
  ten: '',
  mo_ta: '',
  hinh_anh: '',
  gia: 0,
  ton_kho: 0
});


onMounted(() => {
  // Fetch products when component is mounted
  console.log('Fetching products...');
  fetchProducts();
});

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await apiService.get('products?_sort=-gia');
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
const addProduct = async () => {
  try {
    /**
     * them san pham => POST method
     */
    const payload = {
      id: product.id,
      ten: product.ten,
      mo_ta: product.mo_ta,
      hinh_anh: product.hinh_anh,
      gia: product.gia,
      ton_kho: product.ton_kho
    };
    const response = await apiService.post('products', payload);
    console.log('Product added:', response.data);
    alert('Sản phẩm đã được thêm thành công!');
    fetchProducts(); // Refresh the product list after adding a new product
    // Clear the form after successful submission
    Object.assign(product, {
      id: '',
      ten: '',
      mo_ta: '',
      hinh_anh: '',
      gia: 0,
      ton_kho: 0
    });
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

const saveProduct = async () => {
  try {
    /**
     * them san pham => POST method
     */
    const payload = {
      id: product.id,
      ten: product.ten,
      mo_ta: product.mo_ta,
      hinh_anh: product.hinh_anh,
      gia: product.gia,
      ton_kho: product.ton_kho
    };
    const response = await apiService.put(`products/${product.id}`, payload);
    console.log('Product updated:', response.data);
    alert('Sản phẩm đã được cập nhật thành công!');
    fetchProducts(); // Refresh the product list after updating a product
    // Clear the form after successful submission
    Object.assign(product, {
      id: '',
      ten: '',
      mo_ta: '',
      hinh_anh: '',
      gia: 0,
      ton_kho: 0
    });
  } catch (error) {
    console.error('Error updating product:', error);
  }
}
const editProduct = async (productToEdit) => {
  Object.assign(product, productToEdit);
}
</script>

<template>
  <div class="row">
    <h2>Thêm sản phẩm</h2>
    {{ product }}
    <form action="#" method="POST" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="productImage" class="form-label">Mã sản phẩm</label>
        <input class="form-control" v-model="product.id" type="text" id="productImage" name="product_image">
      </div>

      <div class="mb-3">
        <label for="productName" class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-control" id="productName" name="product_name" v-model="product.ten">
      </div>

      <div class="mb-3">
        <label for="productDesc" class="form-label">Mô tả sản phẩm</label>
        <textarea class="form-control" v-model="product.mo_ta" id="productDesc" name="product_desc" rows="3"
          required></textarea>
      </div>
      <div class="mb-3">
        <label for="productImage" class="form-label">Hình ảnh sản phẩm</label>
        <input class="form-control" v-model="product.hinh_anh" type="text" id="productImage" name="product_image">
      </div>


      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label for="productPrice" class="form-label">Giá (₫)</label>
          <input type="number" class="form-control" v-model="product.gia" id="productPrice" name="product_price" min="0"
            step="1000" required>
        </div>

        <div class="col-md-6">
          <label for="productStock" class="form-label">Tồn kho</label>
          <input type="number" class="form-control" v-model="product.ton_kho" id="productStock" name="product_stock" min="0" required>
        </div>
      </div>

      <button type="button" class="btn btn-primary w-100" @click="addProduct">Lưu Sản Phẩm</button>
       <button type="button" class="btn btn-success w-100 mt-2" @click="saveProduct">cập nhật Sản Phẩm</button>
    </form>
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
            currency: 'VND'
          }) }}</p>
          <p class="card-text">
            <!-- <span style="color: red;" v-if="product.ton_kho<20">
                        <strong style="color: red;">Tồn kho:</strong> {{ product.ton_kho}}
                       </span>
                        <span v-else>
                        <strong>Tồn kho:</strong> {{ product.ton_kho}}
                       </span> -->
            <strong :class="{ blinksmooth: product.ton_kho < 20 }">Tồn kho: {{ product.ton_kho }} </strong> <br />
            <button class="btn btn-danger" @click="deleteProduct(product.id)">xóa sản phẩm</button>
            <button class="btn btn-warning" @click="editProduct(product)">Sửa sản phẩm</button>

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