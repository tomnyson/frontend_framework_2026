<script setup>
import { reactive } from 'vue';

const products = reactive([
    {
      "id": "SP001",
      "ten": "Điện Thoại Thông Minh X1",
      "gia": 12500000,
      "mo_ta": "Màn hình OLED 6.5 inch, camera 64MP, pin 5000mAh sạc siêu tốc.",
      "hinh_anh": "https://picsum.photos/400/400?random=1",
      "so_luong": 1,
      "ton_kho": 45
    },
    {
      "id": "SP002",
      "ten": "Tai Nghe Bluetooth Không Dây Pro",
      "gia": 850000,
      "mo_ta": "Chống ồn chủ động ANC, âm bass sâu, pin sử dụng liên tục 8 giờ.",
      "hinh_anh": "https://picsum.photos/400/400?random=2",
      "so_luong": 2,
      "ton_kho": 120
    },
    {
      "id": "SP003",
      "ten": "Balo Du Lịch Chống Nước",
      "gia": 450000,
      "mo_ta": "Chất liệu vải Oxford chống thấm nước, dung tích 35L, nhiều ngăn tiện lợi.",
      "hinh_anh": "https://picsum.photos/400/400?random=3",
      "so_luong": 1,
      "ton_kho": 80
    },
    {
      "id": "SP004",
      "ten": "Giày Thể Thao Nam Siêu Nhẹ",
      "gia": 650000,
      "mo_ta": "Đế EVA siêu nhẹ, mặt lưới thoáng khí, thích hợp chạy bộ và tập gym.",
      "hinh_anh": "https://picsum.photos/400/400?random=4",
      "so_luong": 1,
      "ton_kho": 55
    },
    {
      "id": "SP005",
      "ten": "Đồng Hồ Thông Minh Sport Fit",
      "gia": 1200000,
      "mo_ta": "Đo nhịp tim, nồng độ oxy trong máu SpO2, theo dõi giấc ngủ, chống nước 5ATM.",
      "hinh_anh": "https://picsum.photos/400/400?random=5",
      "so_luong": 1,
      "ton_kho": 30
    },
    {
      "id": "SP006",
      "ten": "Sạc Dự Phòng 20000mAh",
      "gia": 350000,
      "mo_ta": "Hỗ trợ sạc nhanh 20W, tích hợp 2 cổng USB và 1 cổng Type-C.",
      "hinh_anh": "https://picsum.photos/400/400?random=6",
      "so_luong": 3,
      "ton_kho": 200
    },
    {
      "id": "SP007",
      "ten": "Bàn Phím Cơ Gaming RGB",
      "gia": 950000,
      "mo_ta": "Switch Blue cơ học, đèn LED RGB 16.8 triệu màu, tuổi thọ 50 triệu lần nhấn.",
      "hinh_anh": "https://picsum.photos/400/400?random=7",
      "so_luong": 1,
      "ton_kho": 15
    },
    {
      "id": "SP008",
      "ten": "Chuột Không Dây Silent",
      "gia": 150000,
      "mo_ta": "Thiết kế công thái học, nút click chống ồn, kết nối receiver USB 2.4GHz.",
      "hinh_anh": "https://picsum.photos/400/400?random=8",
      "so_luong": 5,
      "ton_kho": 300
    },
    {
      "id": "SP009",
      "ten": "Áo Thun Cotton Nam Cổ Tròn",
      "gia": 120000,
      "mo_ta": "100% cotton co giãn 4 chiều, thấm hút mồ hôi tốt, form chuẩn châu Á.",
      "hinh_anh": "https://picsum.photos/400/400?random=9",
      "so_luong": 4,
      "ton_kho": 500
    },
    {
      "id": "SP010",
      "ten": "Bình Giữ Nhiệt Inox 304 500ml",
      "gia": 180000,
      "mo_ta": "Giữ nóng 8 tiếng, giữ lạnh 12 tiếng, chất liệu an toàn không gỉ sét.",
      "hinh_anh": "https://picsum.photos/400/400?random=10",
      "so_luong": 2,
      "ton_kho": 90
    }
  ]);
const deleteProduct =(id) => {
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
        <div class="col-md-3 mb-3" v-for="product in products" :key="product.id">
            <div class="card h-100">
                <img :src="product.hinh_anh" class="card-img-top" alt="Hình ảnh sản phẩm">
                <div class="card-body">
                    <h5 class="card-title">{{ product.ten }}</h5>
                    <p class="card-text">{{ product.mo_ta }}</p>
                    <p class="card-text"><strong>Giá:</strong> {{ product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</p>
                    <p class="card-text">
                        <!-- <span style="color: red;" v-if="product.ton_kho<20">
                        <strong style="color: red;">Tồn kho:</strong> {{ product.ton_kho}}
                       </span>
                        <span v-else>
                        <strong>Tồn kho:</strong> {{ product.ton_kho}}
                       </span> -->
                        <strong :class="{blinksmooth: product.ton_kho < 20}">Tồn kho: {{ product.ton_kho}} </strong> <br/>
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