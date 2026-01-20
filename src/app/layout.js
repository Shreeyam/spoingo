// src/app/layout.js
import '@/components/globals.css'; // Optional: import global styles
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import ExtLink from '@/components/ui/externallink';
import Script from 'next/script';
import siteConfig from '@/config/siteConfig';

export const metadata = {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
};

function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold">
                    {siteConfig.site.title}
                </Link>
                <nav className="space-x-4 ">
                    <Link href="/blog" >
                        <Button variant="link">Blog</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="link" >About</Button>
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
                    &copy; {new Date().getFullYear()} {siteConfig.footer.copyright}.{' '}
                    {siteConfig.footer.poweredBy && (
                        <>Powered by <ExtLink href={siteConfig.footer.poweredBy.url}>{siteConfig.footer.poweredBy.name}</ExtLink>.</>
                    )}
                </p>
            </div>
        </footer>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang={siteConfig.site.language}>
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
                <div className="container mx-auto">
                    <Navbar />
                    <main className="min-h-[calc(100vh-160px)]">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
