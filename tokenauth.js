// tokenauth.js
import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // For API endpoints (except tokengen) allow only GET requests.
    if (
        pathname.startsWith("/api") &&
        !pathname.startsWith("/api/tokengen")  // allow tokengen endpoint
    ) {
        if (request.method !== "GET") {
            return new NextResponse("Method Not Allowed", { status: 405 });
        }
    }

    // For /cms and /editor pages, check for auth-token cookie.
    if (pathname.startsWith("/cms") || pathname.startsWith("/editor")) {
        const token = request.cookies.get("auth-token");
        if (!token || token.value !== "authenticated") {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*", "/cms/:path*", "/editor/:path*"],
};
