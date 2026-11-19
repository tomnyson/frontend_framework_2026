/**
 * Thêm tài khoản mẫu vào db.json (bỏ qua email đã tồn tại).
 * Chạy khi server ĐANG TẮT: server giữ db.json trong RAM và sẽ ghi đè thay đổi từ bên ngoài.
 *   npm run seed:users
 * Đổi mật khẩu mẫu qua env: SEED_ADMIN_PASSWORD, SEED_USER_PASSWORD.
 */
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db } from "./db.js";

const BCRYPT_ROUNDS = 10;

const SEED_USERS = [
    { email: "admin@example.com", name: "Admin", role: "admin", password: process.env.SEED_ADMIN_PASSWORD || "admin123" },
    { email: "user@example.com", name: "Nguyễn Văn A", role: "user", password: process.env.SEED_USER_PASSWORD || "user123" },
];

async function toUserRecord({ password, ...info }) {
    return {
        id: randomUUID(),
        ...info,
        passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
        createdAt: new Date().toISOString(),
    };
}

async function main() {
    const existing = db.data.users || [];
    const existingEmails = new Set(existing.map((u) => u.email));
    const toAdd = SEED_USERS.filter((u) => !existingEmails.has(u.email));

    const newUsers = await Promise.all(toAdd.map(toUserRecord));
    db.data = { ...db.data, users: [...existing, ...newUsers] };
    await db.write();

    newUsers.forEach((u) => console.log(`+ ${u.email} (${u.role})`));
    console.log(`Đã thêm ${newUsers.length}, bỏ qua ${SEED_USERS.length - newUsers.length} (đã tồn tại).`);
}

main().catch((err) => {
    console.error("Seed thất bại:", err);
    process.exit(1);
});
