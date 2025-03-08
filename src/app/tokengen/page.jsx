// app/tokengen/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [secret, setSecret] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secret }),
        });
        if (res.ok) {
            router.push("/editor");
        } else {
            setError("Invalid secret");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter secret"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
