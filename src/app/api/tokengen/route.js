// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
    const { secret } = await request.json();

    // Validate the secret against the environment variable
    if (secret === process.env.AUTH_SECRET) {
        const response = NextResponse.json({ success: true });
        response.cookies.set("auth-token", "authenticated", {
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
