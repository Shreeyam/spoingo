// src/app/layout.js
import '@/components/globals.css'; // Optional: import global styles
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import ExtLink from '@/components/ui/externallink';
import Script from 'next/script';

export const metadata = {
    title: 'Shreeyam\'s Page',
    description: 'Shreeyam\'s personal website',
};

function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold">
                    Shreeyam&apos;s Page
                </Link>
                <nav className="space-x-4 ">
                    <Link href="/blog" >
                        <Button variant="link">Blog</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="link" >About</Button>
                    </Link>
                    <Link href="https://treetrack.shreey.am/" >
                        <Button variant="link"><ExternalLink size={16} />Treetrack</Button>
                    </Link>
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
                    © {new Date().getFullYear()} Shreeyam Kacker. Powered by <ExtLink href="https://www.github.com/Shreeyam/spoingo">Spoingo</ExtLink>.
                </p>
            </div>
        </footer>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Google Analytics */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.GA_ID}', {
                          page_path: window.location.pathname,
                        });
            `}
                </Script>
            </head>
            <body>
                <div className="container px-4 mx-auto">
                    <Navbar />
                    <main className="min-h-[calc(100vh-160px)]">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
