// app/api/login/route.js
import { NextResponse } from "next/server";

// Precompute the hash once using top-level await
const secret_hash = await (async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(process.env.AUTH_SECRET);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
})();

export async function POST(request) {
    const { secret } = await request.json();

    // Validate the secret against the environment variable
    if (secret === process.env.AUTH_SECRET) {
        const response = NextResponse.json({ success: true });
        response.cookies.set("auth-token", secret_hash, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        return response;
    } else {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
}
