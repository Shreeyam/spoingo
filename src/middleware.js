// middleware.js
import { NextResponse } from "next/server";

// Precompute the hash once using top-level await
const secret_hash = await (async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(process.env.AUTH_SECRET);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
})();

export default function middleware(request) {
    const { pathname } = request.nextUrl;

    // For API endpoints (except tokengen) allow only GET requests.
    if (pathname.startsWith("/api") && !pathname.startsWith("/api/tokengen")) {
        if (request.method !== "GET" && (!request.cookies.get("auth-token") || request.cookies.get("auth-token").value !== secret_hash)) {
            return new NextResponse("Method Not Allowed", { status: 405 });
        }
    }

    // For /cms and /editor pages, check for auth-token cookie.
    if (pathname.startsWith("/cms") || pathname.startsWith("/editor")) {
        const token = request.cookies.get("auth-token");
        if (!token || token.value !== secret_hash) {
            return NextResponse.redirect(new URL("/tokengen", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*", "/cms/:path*", "/editor/:path*"],
};
