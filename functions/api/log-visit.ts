import { appendLogRow, type GoogleSheetsEnv } from "../lib/googleSheets";

interface RequestContext {
  request: Request;
  env: GoogleSheetsEnv;
}

// Pure observability: logs that a name was entered on the passcode page.
// Never validated against a guest list, never blocks — the passcode check
// is still the only real gate, this just records who's come through it.
export async function onRequestPost({ request, env }: RequestContext) {
  let name = "";
  try {
    const body = (await request.json()) as { name?: unknown };
    name = typeof body?.name === "string" ? body.name.trim() : "";
  } catch {
    return Response.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  if (!name) {
    return Response.json({ ok: false, error: "missing name" }, { status: 400 });
  }

  try {
    await appendLogRow(env, name);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("log-visit failed", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
