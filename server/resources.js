import { Router } from "express";
import { Service, isItem } from "json-server/lib/service.js";
import { parseWhere } from "json-server/lib/parse-where.js";
import { db } from "./db.js";

/**
 * REST API cho dữ liệu cũ trong db.json, giữ nguyên cú pháp + format response của json-server v1:
 *   GET /products?_sort=-gia&gia:gt=100000&_page=1&_per_page=10
 *   GET/PUT/PATCH/DELETE /products/:id, POST /products
 *
 * Chỉ các collection trong allowlist mới được public — KHÔNG BAO GIỜ thêm "users"
 * (chứa passwordHash, và POST /users sẽ cho tự tạo admin).
 */
const DEFAULT_COLLECTIONS = ["products"];
const ALLOWED = new Set(
    (process.env.PUBLIC_COLLECTIONS || DEFAULT_COLLECTIONS.join(","))
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && s !== "users" && !s.startsWith("$")),
);
const RESERVED_QUERY_KEYS = new Set(["_sort", "_page", "_per_page", "_embed", "_where"]);

const service = new Service(db);

function toInt(raw) {
    const n = raw === null ? undefined : Number.parseInt(raw, 10);
    return Number.isNaN(n) ? undefined : n;
}

// Sao chép từ json-server/lib/app.js (hàm này không được export)
function parseListParams(req) {
    const params = new URLSearchParams(req.originalUrl.split("?")[1] ?? "");
    const filterParams = new URLSearchParams(
        [...params.entries()].filter(([key]) => !RESERVED_QUERY_KEYS.has(key)),
    );
    let where = parseWhere(filterParams.toString());
    const rawWhere = params.get("_where");
    if (rawWhere) {
        try {
            const parsed = JSON.parse(rawWhere);
            if (parsed && typeof parsed === "object") where = parsed;
        } catch {
            // _where sai JSON -> dùng filter từ query thường
        }
    }
    return {
        where,
        sort: params.get("_sort") ?? undefined,
        page: toInt(params.get("_page")),
        perPage: toInt(params.get("_per_page")),
        embed: params.getAll("_embed").filter((e) => ALLOWED.has(e)),
    };
}

const send = (res, data, status = 200) =>
    data === undefined ? res.status(404).json({ error: "Not Found" }) : res.status(status).json(data);

function checkCollection(req, res, next) {
    if (!ALLOWED.has(req.params.name)) return res.status(404).json({ error: "Not Found" });
    return next();
}

function requireObjectBody(req, res, next) {
    if (!isItem(req.body)) return res.status(400).json({ error: "Body must be a JSON object" });
    return next();
}

const asyncRoute = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export const resourceRouter = Router();
resourceRouter.param("name", (req, res, next) => checkCollection(req, res, next));

resourceRouter.get("/:name", (req, res) => send(res, service.find(req.params.name, parseListParams(req))));

resourceRouter.get("/:name/:id", (req, res) => {
    const { _embed } = parseListParams(req);
    send(res, service.findById(req.params.name, req.params.id, { _embed }));
});

resourceRouter.post(
    "/:name",
    requireObjectBody,
    asyncRoute(async (req, res) => send(res, await service.create(req.params.name, req.body), 201)),
);

resourceRouter.put(
    "/:name/:id",
    requireObjectBody,
    asyncRoute(async (req, res) => send(res, await service.updateById(req.params.name, req.params.id, req.body))),
);

resourceRouter.patch(
    "/:name/:id",
    requireObjectBody,
    asyncRoute(async (req, res) => send(res, await service.patchById(req.params.name, req.params.id, req.body))),
);

resourceRouter.delete(
    "/:name/:id",
    asyncRoute(async (req, res) => send(res, await service.destroyById(req.params.name, req.params.id, req.query._dependent))),
);
