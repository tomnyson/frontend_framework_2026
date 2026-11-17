<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import apiService from '../api/api.js';
  const route = useRoute();
  const productId = route.params.id;
  // lay chi tiet san pham tu productId
  // show len giao dien
 onMounted(() => {
    console.log('Product ID:', productId);
    fetchProductDetails();
  });
  const productDetails = ref(null);
  const fetchProductDetails = async () => {
  // isLoading.value = true;
  try {
    const response = await apiService.get(`products/${productId}`);
    productDetails.value = response.data;
    console.log('Product details fetched:', productDetails.value);
  } catch (error) {
    console.error('Error fetching product details:', error);
  } finally {
  
  }
};
   
</script>
  // Fetch product details based on the productId
  // You can use an API call or any other method to get the product details
<template>
  <p>Product ID: {{ productId }}</p>
  <div v-if="productDetails">
    <h2>{{ productDetails.ten }}</h2>
    <p>{{ productDetails.mo_ta }}</p>
    <p>Price: {{ productDetails.gia }}</p>
    <p>Stock: {{ productDetails.ton_kho }}</p>
    <img :src="productDetails.hinh_anh" alt="Product Image" />
  </div>
</template>