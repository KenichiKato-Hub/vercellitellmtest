import { getVercelOidcToken } from "@vercel/oidc";

export const runtime = "nodejs";

const LITELLM_BASE_URL =
  process.env.LITELLM_BASE_URL?.replace(/\/$/, "") ||
  "https://3.115.107.157:8000";

export async function GET() {
  const apiKey = process.env.LITELLM_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "LITELLM_API_KEY is not set" },
      { status: 500 },
    );
  }

  let oidcToken: string;
  try {
    oidcToken = await getVercelOidcToken();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return Response.json(
      { ok: false, error: "failed to get OIDC token", detail: message },
      { status: 500 },
    );
  }

  const upstream = await fetch(`${LITELLM_BASE_URL}/v1/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "X-Vercel-OIDC-Token": oidcToken,
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // keep raw text
  }

  return Response.json(
    {
      ok: upstream.ok,
      upstreamStatus: upstream.status,
      litellmBaseUrl: LITELLM_BASE_URL,
      body,
    },
    { status: upstream.ok ? 200 : upstream.status },
  );
}
