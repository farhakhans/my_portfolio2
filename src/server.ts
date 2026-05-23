import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Simple upload endpoint: POST /api/upload-resume
      try {
        const url = new URL(request.url);
        if (url.pathname === "/api/upload-resume" && request.method === "POST") {
          try {
            const buffer = await request.arrayBuffer();
            const fs = await import("fs/promises");
            const pathLib = await import("path");
            // write to the dev server's public folder. When running `npm --prefix src run dev`,
            // process.cwd() will be the `src` folder, whose `public` is served at '/'.
            const path = pathLib.join(process.cwd(), "public", "resume.pdf");
            await fs.writeFile(path, Buffer.from(buffer));
            return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
          } catch (err) {
            console.error("Upload error:", err);
            return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: { "content-type": "application/json" } });
          }
        }
        if (url.pathname === "/api/upload-video" && request.method === "POST") {
          try {
            const buffer = await request.arrayBuffer();
            const fs = await import("fs/promises");
            const pathLib = await import("path");
            const headers = request.headers;
            let filename = headers.get("x-filename") || url.searchParams.get("filename") || `video-${Date.now()}.mp4`;
            // sanitize filename
            filename = pathLib.basename(filename.replace(/[^a-zA-Z0-9._-]/g, "-"));
            const dir = pathLib.join(process.cwd(), "public", "videos");
            await fs.mkdir(dir, { recursive: true });
            const outPath = pathLib.join(dir, filename);
            await fs.writeFile(outPath, Buffer.from(buffer));
            return new Response(JSON.stringify({ ok: true, filename, url: `/videos/${filename}` }), { status: 200, headers: { "content-type": "application/json" } });
          } catch (err) {
            console.error("Video upload error:", err);
            return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: { "content-type": "application/json" } });
          }
        }
      } catch (err) {
        console.error("Upload route check error:", err);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
