"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock } from "lucide-react";

export default function TokengenPage() {
    const [secret, setSecret] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/tokengen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret }),
            });

            if (res.ok) {
                router.push("/editor");
            } else {
                setError("Invalid secret key. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-grow items-center justify-center align-center px-4 min-h-[calc(100vh-160px)]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Authentication</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type="password"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    placeholder="Enter secret key"
                                    className="pr-10"
                                    required
                                    autoFocus
                                />
                                <Lock
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={16}
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="py-2">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Continue"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};