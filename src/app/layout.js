// src/app/layout.js
import '@/components/globals.css'; // Optional: import global styles
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const metadata = {
    title: 'Shreeyam\'s Page',
    description: 'A blog built with Next.js App Router',
};

function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold">
                    Shreeyam's Page
                </Link>
                <nav className="space-x-4">
                    <Link href="/about">
                        <Button variant="link">About</Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="link">Contact</Button>
                    </Link>
                    <a href="https://treetrack.shreey.am/">
                        <Button variant="link"><ExternalLink size={16}/>Treetrack</Button>
                    </a>
                </nav>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-4 text-center">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Shreeyam Kacker. Powered by spungle
                </p>
            </div>
        </footer>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="container mx-auto px-4">
                <Navbar />
                <main className="min-h-[calc(100vh-160px)]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
