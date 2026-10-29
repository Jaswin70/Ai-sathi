import handler from "../../netlify/functions/api.mjs";

export async function onRequest(ctx) {
  globalThis.process = globalThis.process || { env: {} };
  globalThis.process.env = globalThis.process.env || {};
  for (const [k, v] of Object.entries(ctx.env || {})) {
    if (typeof v === "string") globalThis.process.env[k] = v;
  }
  const ip = ctx.request.headers.get("cf-connecting-ip") || "";
  return handler(ctx.request, { ip });
}
