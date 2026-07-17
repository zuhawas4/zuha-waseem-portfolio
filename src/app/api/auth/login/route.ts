import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  checkLoginRateLimit,
  getClientIp,
  recordFailedLogin,
  resetLoginAttempts,
} from "@/lib/rate-limit";

/**
 * POST /api/auth/login
 * Server-side login with reCAPTCHA v3 + IP rate limiting.
 * Always returns generic errors (no stack traces / email existence leaks).
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    const rate = await checkLoginRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: rate.message || "Too many attempts, try again later." },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 },
      );
    }

    const payload =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};

    const email =
      typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const password =
      typeof payload.password === "string" ? payload.password : "";
    const captchaToken =
      typeof payload.captchaToken === "string" ? payload.captchaToken : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const captcha = await verifyRecaptcha(captchaToken);
    if (!captcha.ok) {
      return NextResponse.json(
        {
          error:
            "Security check failed. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      },
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      await recordFailedLogin(ip);
      return NextResponse.json(
        { error: "Invalid email or password. Please try again." },
        { status: 401 },
      );
    }

    await resetLoginAttempts(ip);

    return NextResponse.json({
      success: true,
      user: { id: data.user.id, email: data.user.email },
    });
  } catch (error) {
    console.error("[api/auth/login]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
