import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const DB_PATH = process.env.DB_PATH || fileURLToPath(new URL("./db.json", import.meta.url));

/**
 * Instance lowdb DUY NHẤT cho cả server (resources + auth).
 * lowdb giữ dữ liệu trong RAM và ghi đè cả file mỗi lần write,
 * nên mọi chỗ đọc/ghi db.json phải đi qua instance này.
 */
export const db = new Low(new JSONFile(DB_PATH), {});
await db.read();
db.data = { users: [], ...(db.data || {}) };
