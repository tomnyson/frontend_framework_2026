<script setup>
import { reactive } from 'vue';
defineProps({
  name: {
    type: String,
    default: ''
  }
});

const info = reactive({
  email: 'tabletkindfire@gmail.com',
  phone: '0349528472',
  address: 'Buôn Ma Thuột, Đắk Lắk, Việt Nam'
});
</script>
<template>
    <header class="border-bottom border-2 pb-4 mb-4">
        <h1 class="fw-bold text-primary text-uppercase mb-1" style="letter-spacing: 1px;">{{ name }}</h1>
        <h4 class="fw-medium text-primary mb-4 fs-5">Lập trình viên Full Stack Senior · Giảng viên CNTT</h4>

        <div class="d-flex flex-wrap gap-3 gap-md-4 text-secondary fs-6">
          <span class="d-flex align-items-center gap-2">
            <i class="fas fa-phone text-primary"></i> {{ info.phone }}
          </span>
          <span class="d-flex align-items-center gap-2">
            <i class="fas fa-envelope text-primary"></i>
            <a href="mailto:tabletkindfire@gmail.com"
              class="text-decoration-none text-secondary custom-link">{{ info.email }}</a>
          </span>
          <span class="d-flex align-items-center gap-2">
            <i class="fab fa-github text-primary"></i>
            <a href="https://github.com/tomnyson" target="_blank"
              class="text-decoration-none text-secondary custom-link">github.com/tomnyson</a>
          </span>
          <span class="d-flex align-items-center gap-2">
            <i class="fas fa-map-marker-alt text-primary"></i> {{ info.address }}
          </span>
        </div>
      </header>
</template>

<style scoped>
</style>