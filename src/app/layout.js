// src/app/layout.js
import '@/components/globals.css'; // Optional: import global styles
import Link from 'next/link';
import ExtLink from '@/components/ui/externallink';
import Script from 'next/script';
import siteConfig from '@/config/siteConfig';

export const metadata = {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
};

function Navbar() {
    return (
        <header>
            <div className="container mx-auto flex items-center justify-end px-4 py-4">
                <nav className="flex items-center gap-8 text-sm">
                    <Link href="/" className="hover:underline underline-offset-2">
                        Home
                    </Link>
                    <Link href="/blog" className="hover:underline underline-offset-2">
                        Blog
                    </Link>
                    <Link href="/about" className="hover:underline underline-offset-2">
                        About
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
