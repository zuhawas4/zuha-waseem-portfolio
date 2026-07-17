/**
 * Verify a Google reCAPTCHA v3 token server-side.
 * Returns { ok: true, score } or { ok: false }.
 */
export async function verifyRecaptcha(token: string): Promise<{
  ok: boolean;
  score?: number;
}> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // In local demos without keys, skip verification but log once
    console.warn("[recaptcha] RECAPTCHA_SECRET_KEY missing — skipping verify");
    return { ok: true, score: 1 };
  }

  if (!token) {
    return { ok: false };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    },
  );

  const data = (await response.json()) as {
    success?: boolean;
    score?: number;
    "error-codes"?: string[];
  };

  if (!data.success) {
    return { ok: false };
  }

  const score = data.score ?? 0;
  // v3 scores 0.0–1.0 — reject low-confidence traffic
  if (score < 0.5) {
    return { ok: false, score };
  }

  return { ok: true, score };
}
