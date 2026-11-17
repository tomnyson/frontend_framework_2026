# DeskFlow – Template HTML bán hàng (Web + Admin)

Template giao diện tĩnh **chỉ HTML + CSS** (không JavaScript, không framework), bố cục lấy cảm hứng từ các shop nội thất văn phòng công thái học. Thương hiệu "DeskFlow", logo đối tác, địa chỉ và mọi dữ liệu đều là **dữ liệu mẫu**.

## Cách xem

Mở trực tiếp `index.html` bằng trình duyệt, hoặc dùng VS Code Live Server.

## Sơ đồ trang

### Website

| Nhóm | Trang | Nội dung |
|---|---|---|
| Trang chủ | `index.html` | Hero slider, khuyến mãi, danh mục, sản phẩm mới, B2B, đối tác, blog, FAQ, newsletter |
| Mua hàng | `collection.html` | Bộ lọc (sidebar / overlay trên mobile), sắp xếp, đổi lưới ↔ danh sách, phân trang |
| | `product.html` | Gallery, chọn biến thể, tab sticky: tổng quan · thông số · so sánh · đánh giá, sản phẩm liên quan |
| | `cart.html` | Bảng giỏ hàng, mã giảm giá, tóm tắt, trạng thái giỏ trống (`#cart-empty`) |
| | `checkout.html` | 3 bước, thông tin liên hệ, địa chỉ 2 cấp (Tỉnh/TP → Phường/Xã), giao hàng, thanh toán |
| | `order-success.html` | Mã đơn, thông tin chuyển khoản/QR, trạng thái đơn |
| | `search.html` | Ô tìm kiếm, từ khoá gợi ý, kết quả sản phẩm + bài viết, trạng thái không có kết quả |
| Tài khoản | `login.html` | Tab Đăng nhập / Đăng ký, quên mật khẩu, đăng nhập mạng xã hội |
| | `account.html` | Tổng quan · Đơn hàng · Sổ địa chỉ · Thông tin cá nhân |
| | `account-order.html` | Tra cứu và chi tiết đơn hàng |
| | `wishlist.html` | Sản phẩm yêu thích |
| | `rewards.html` | Tích điểm, hạng thành viên, đổi quà |
| Nội dung | `blog.html`, `blog-post.html` | Danh sách bài viết, chi tiết bài có mục lục và bình luận |
| | `about.html`, `contact.html`, `b2b.html` | Giới thiệu, liên hệ + showroom, giải pháp doanh nghiệp + form báo giá |
| | `policy.html` | Bảo hành (kèm tra cứu) · giao hàng · đổi trả · bảo mật · điều khoản |
| | `404.html` | Trang không tìm thấy |

### Admin (`admin/`)

`login.html`, `index.html` (dashboard), `products.html`, `product-form.html`, `categories.html`, `orders.html`, `order-detail.html`, `customers.html`.

### Luồng mua hàng

`index` → `collection` → `product` → giỏ hàng (drawer `#cart` hoặc `cart.html`) → `checkout` → `order-success` → `account-order`

## CSS

| File | Dùng cho |
|---|---|
| `base.css` | Design tokens (`:root`), reset, button, form, badge, overlay |
| `web.css` | Header, mega menu, footer, product card, cart drawer, chat |
| `components.css` | Breadcrumb, page hero, product grid, chip, pager, box, timeline |
| `home.css` | Các section riêng của trang chủ |
| `shop.css` | Collection, product detail |
| `checkout.css` | Cart, checkout, order success, search |
| `account.css` | Login, account, order tracking, wishlist, rewards |
| `content.css` | Blog, article, about, contact, b2b, policy, 404 |
| `admin.css` | Toàn bộ trang admin |

## Tương tác chỉ bằng CSS

| Tương tác | Kỹ thuật |
|---|---|
| Mega menu (desktop) | `:hover` / `:focus-within` |
| Menu mobile, sidebar admin mobile | Checkbox hack (`input:checked ~ .nav`) |
| Giỏ hàng drawer, bộ lọc mobile, modal admin | `:target` (`href="#cart"`, đóng bằng `href="#"`) |
| Gallery ảnh, tab tài khoản, tab đăng nhập/đăng ký, lưới ↔ danh sách | Radio + `<label>` + `:has()` |
| Chọn biến thể, chọn sao đánh giá | Radio + `input:checked + span` |
| Slider, carousel sản phẩm | `scroll-snap` |
| FAQ, form viết đánh giá, nút chat | `<details>` / `<summary>` |
| Tab sticky trên trang sản phẩm | Anchor + `position: sticky` + `scroll-margin-top` |
| Validate form | HTML5: `required`, `type="email"`, `pattern`, `minlength` |

## Chỉnh sửa (dành cho người phát triển)

Header, footer, giỏ hàng và card sản phẩm/bài viết được dùng chung. Để không phải sửa ~20 file bằng tay, các trang web được sinh từ `_build/` bằng Python (chỉ chạy offline, không ảnh hưởng template):

```bash
python3 _build/build.py   # sinh lại các trang web từ _build/pages/*.html
python3 _build/check.py   # kiểm tra: không có <script>, mọi link và #id đều tồn tại
```

- Sửa nội dung một trang: `_build/pages/<tên-trang>.html`
- Sửa header / footer / cart drawer / card: `_build/layout.py`
- Sửa danh sách sản phẩm, bài viết mẫu: `_build/data.py`

> Lưu ý: đừng sửa trực tiếp các file `.html` ở thư mục gốc, lần build sau sẽ ghi đè. Trang admin là HTML viết tay, sửa trực tiếp trong `admin/`.

## Tuỳ biến

- Đổi màu, font, bo góc: sửa biến trong `:root` ở `assets/css/base.css`.
- Ảnh đang dùng placeholder `picsum.photos`; thay bằng ảnh sản phẩm thật khi dùng.
