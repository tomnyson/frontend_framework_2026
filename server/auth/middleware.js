import { verifyToken } from "./jwt.js";

/**
 * Middleware bảo vệ route: yêu cầu header "Authorization: Bearer <token>".
 * Nếu hợp lệ, gắn payload vào req.user.
 */
export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ success: false, data: null, error: "Thiếu header Authorization: Bearer <token>" });
    }

    const result = verifyToken(token);
    if (!result.valid) {
        return res.status(401).json({ success: false, data: null, error: result.error });
    }

    req.user = result.payload;
    return next();
}

/**
 * Middleware kiểm tra role, dùng sau requireAuth. Ví dụ: requireRole("admin").
 */
export function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, data: null, error: "Không có quyền truy cập" });
        }
        return next();
    };
}
