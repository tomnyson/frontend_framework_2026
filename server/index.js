import express from "express";
import cors from "cors";
import { authRouter } from "./auth/routes.js";
import { requireAuth, requireRole } from "./auth/middleware.js";
import { resourceRouter } from "./resources.js";

// 3005 = VITE_API_BASE_URL của frontend (thay cho json-server cũ)
const PORT = Number(process.env.PORT) || 3005;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("Thiếu JWT_SECRET (>= 32 ký tự). Tạo file server/.env theo server/.env.example");
    process.exit(1);
}

const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "100kb" }));

app.use("/auth", authRouter);

// Ví dụ route cần đăng nhập
app.get("/api/profile", requireAuth, (req, res) => {
    res.json({ success: true, data: { user: req.user }, error: null });
});

// Ví dụ route chỉ admin
app.get("/api/admin", requireAuth, requireRole("admin"), (_req, res) => {
    res.json({ success: true, data: { message: "Xin chào admin" }, error: null });
});

// Dữ liệu cũ trong db.json (/products, ...) — mount SAU /auth và /api
app.use("/", resourceRouter);

app.use((_req, res) => {
    res.status(404).json({ success: false, data: null, error: "Không tìm thấy route" });
});

app.use((err, _req, res, _next) => {
    console.error("[auth-server]", err);
    res.status(500).json({ success: false, data: null, error: "Lỗi server" });
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
