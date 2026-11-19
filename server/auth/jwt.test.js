import { test } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = "test-secret-test-secret-test-secret-1234";
const { createToken, verifyToken } = await import("./jwt.js");
const { requireAuth, requireRole } = await import("./middleware.js");

test("createToken + verifyToken: token hợp lệ trả về payload", () => {
    const token = createToken({ sub: "u1", role: "user" });
    const result = verifyToken(token);
    assert.equal(result.valid, true);
    assert.equal(result.payload.sub, "u1");
    assert.ok(result.payload.exp > result.payload.iat);
});

test("verifyToken: token hết hạn", () => {
    const token = jwt.sign({ sub: "u1", exp: Math.floor(Date.now() / 1000) - 10 }, process.env.JWT_SECRET);
    assert.deepEqual(verifyToken(token), { valid: false, error: "Token đã hết hạn" });
});

test("verifyToken: sai secret / bị sửa / thiếu token", () => {
    const forged = jwt.sign({ sub: "u1" }, "another-secret-another-secret-another");
    assert.equal(verifyToken(forged).valid, false);
    const tampered = createToken({ sub: "u1" }).slice(0, -2) + "xx";
    assert.equal(verifyToken(tampered).valid, false);
    assert.equal(verifyToken(undefined).valid, false);
});

test("verifyToken: chặn alg none", () => {
    const none = jwt.sign({ sub: "u1" }, null, { algorithm: "none" });
    assert.equal(verifyToken(none).valid, false);
});

test("createToken: payload không hợp lệ", () => {
    assert.throws(() => createToken(null), TypeError);
});

function mockRes() {
    return {
        statusCode: 200,
        body: null,
        status(code) { this.statusCode = code; return this; },
        json(body) { this.body = body; return this; },
    };
}

test("requireAuth: thiếu / sai / đúng token", () => {
    const res1 = mockRes();
    requireAuth({ headers: {} }, res1, () => assert.fail("không được gọi next"));
    assert.equal(res1.statusCode, 401);

    const res2 = mockRes();
    requireAuth({ headers: { authorization: "Bearer abc" } }, res2, () => assert.fail("không được gọi next"));
    assert.equal(res2.statusCode, 401);

    const req = { headers: { authorization: `Bearer ${createToken({ sub: "u1", role: "admin" })}` } };
    let called = false;
    requireAuth(req, mockRes(), () => { called = true; });
    assert.equal(called, true);
    assert.equal(req.user.sub, "u1");
});

test("requireRole: chặn role không đủ quyền", () => {
    const res = mockRes();
    requireRole("admin")({ user: { role: "user" } }, res, () => assert.fail("không được gọi next"));
    assert.equal(res.statusCode, 403);

    let called = false;
    requireRole("admin")({ user: { role: "admin" } }, mockRes(), () => { called = true; });
    assert.equal(called, true);
});
