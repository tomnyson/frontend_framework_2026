import jwt from "jsonwebtoken";

const ALGORITHM = "HS256";
const DEFAULT_EXPIRES_IN = "1h";

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET chưa cấu hình hoặc ngắn hơn 32 ký tự");
    }
    return secret;
}

/**
 * Tạo JWT token từ payload (ví dụ: { sub: user.id, email, role }).
 */
export function createToken(payload, expiresIn = process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN) {
    if (!payload || typeof payload !== "object") {
        throw new TypeError("payload phải là object");
    }
    return jwt.sign({ ...payload }, getSecret(), { algorithm: ALGORITHM, expiresIn });
}

/**
 * Xác thực JWT token.
 * Trả về { valid: true, payload } hoặc { valid: false, error }.
 */
export function verifyToken(token) {
    if (!token || typeof token !== "string") {
        return { valid: false, error: "Thiếu token" };
    }
    try {
        const payload = jwt.verify(token, getSecret(), { algorithms: [ALGORITHM] });
        return { valid: true, payload };
    } catch (err) {
        const error = err.name === "TokenExpiredError" ? "Token đã hết hạn" : "Token không hợp lệ";
        return { valid: false, error };
    }
}
