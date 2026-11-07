<script setup>
import { ref, computed } from 'vue';
const name = ref('');
const email = ref('');
const ktemail = ref(true);
const toan = ref (0);
const ly = ref (0);
const hoa = ref (0);

// const dtb = (toan.value + ly.value + hoa.value) / 3;
const dtb = computed(() => (Number(toan.value) + Number(ly.value) + Number(hoa.value)) / 3);



function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
const chageEmail = (event) => {
  if (!isValidEmail(event.target.value)) {
    ktemail.value = true;
  } else {
    ktemail.value = false;
  }
};

</script>

<template>
   <div class="toan-ly-hoa">
<div class="toan">
        <label for="toan">toan:</label>
        <input type="text" id="toan" name="toan" v-model="toan" required placeholder="Nhập tên của bạn">
      </div>
      <div class="ly">
        <label for="ly">ly:</label>
        <input type="text" id="ly" name="ly"
        v-model="ly" required placeholder="Nhập tên của bạn">
      </div>
      <div class="hoa">
        <label for="hoa">hoa:</label>
        <input type="text" id="hoa" name="hoa" v-model="hoa" required placeholder="Nhập tên của bạn">
      </div>
      <p>{{ dtb.toFixed(2) }}</p>

    <form action="#" method="POST">
      <div class="form-group">
        <label for="name">Tên:</label>
        <input type="text" id="name" name="name" v-model="name" required placeholder="Nhập tên của bạn">
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" @input="chageEmail" id="email" name="email" v-model="email" required
          placeholder="Nhập email của bạn">
        <span v-if="ktemail" class="error">email invalid format</span>
        <span v-else class="success">email valid format</span>
      </div>

      <div class="form-group">
        <label for="note">Note (Ghi chú):</label>
        <textarea id="note" name="note" v-model="note" placeholder="Nhập ghi chú của bạn"></textarea>
      </div>

      <button type="submit">Gửi</button>
    </form>
    <p> Name: {{ name }}</p>
    <p> Email: {{ email }}</p>
    <p> Note: {{ note }}</p>
  </div>

</template>

<style scoped>
/* Bootstrap 5 ghi đè & tinh chỉnh siêu nhỏ */

body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.error {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.success {
  color: green;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.form-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>