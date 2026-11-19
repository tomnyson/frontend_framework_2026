import { randomUUID } from "node:crypto";
import { db } from "../db.js";

const getUsers = () => db.data.users || [];

export async function findUserByEmail(email) {
    return getUsers().find((u) => u.email === email) || null;
}

export async function findUserById(id) {
    return getUsers().find((u) => u.id === id) || null;
}

export async function createUser({ email, name, passwordHash, role = "user" }) {
    const user = { id: randomUUID(), email, name, passwordHash, role, createdAt: new Date().toISOString() };
    db.data = { ...db.data, users: [...getUsers(), user] };
    await db.write();
    return user;
}

/** Bỏ passwordHash trước khi trả về client. */
export function toPublicUser({ passwordHash, ...rest }) {
    return rest;
}
