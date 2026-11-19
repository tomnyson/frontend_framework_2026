import { Router } from "express";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "./jwt.js";
import { requireAuth } from "./middleware.js";
import { createUser, findUserByEmail, findUserById, toPublicUser } from "./userStore.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const BCRYPT_ROUNDS = 10;

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data, error: null });
const fail = (res, status, error) => res.status(status).json({ success: false, data: null, error });

function validateCredentials({ email, password } = {}) {
    if (typeof email !== "string" || !EMAIL_RE.test(email)) return "Email không hợp lệ";
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
        return `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`;
    }
    return null;
}

function issueToken(user) {
    return createToken({ sub: user.id, email: user.email, role: user.role });
}

export const authRouter = Router();

// POST /auth/register  { email, password, name }
authRouter.post("/register", async (req, res, next) => {
    try {
        const error = validateCredentials(req.body);
        if (error) return fail(res, 400, error);

        const email = req.body.email.trim().toLowerCase();
        if (await findUserByEmail(email)) return fail(res, 409, "Email đã được đăng ký");

        const passwordHash = await bcrypt.hash(req.body.password, BCRYPT_ROUNDS);
        const user = await createUser({ email, name: String(req.body.name || "").trim(), passwordHash });
        return ok(res, { user: toPublicUser(user), token: issueToken(user) }, 201);
    } catch (err) {
        return next(err);
    }
});

// POST /auth/login  { email, password }  -> { token, user }
authRouter.post("/login", async (req, res, next) => {
    try {
        const error = validateCredentials(req.body);
        if (error) return fail(res, 400, error);

        const user = await findUserByEmail(req.body.email.trim().toLowerCase());
        const match = user && (await bcrypt.compare(req.body.password, user.passwordHash));
        if (!match) return fail(res, 401, "Sai email hoặc mật khẩu");

        return ok(res, { user: toPublicUser(user), token: issueToken(user) });
    } catch (err) {
        return next(err);
    }
});

// POST /auth/verify  { token }  -> kiểm tra token có hợp lệ không
authRouter.post("/verify", (req, res) => {
    const result = verifyToken(req.body?.token);
    if (!result.valid) return fail(res, 401, result.error);
    return ok(res, { payload: result.payload });
});

// GET /auth/me  (Authorization: Bearer <token>) -> thông tin user hiện tại
authRouter.get("/me", requireAuth, async (req, res, next) => {
    try {
        const user = await findUserById(req.user.sub);
        if (!user) return fail(res, 404, "Không tìm thấy user");
        return ok(res, { user: toPublicUser(user) });
    } catch (err) {
        return next(err);
    }
});
