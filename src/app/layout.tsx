import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "absent minded",
    description: "a to-do app that makes the list visualized into tree structure",
    manifest: '/absent-minded/site.webmanifest',
    icons: {
        icon: [
            { url: '/absent-minded/favicon.svg?v=3', type: 'image/svg+xml' },
            { url: '/absent-minded/favicon.ico?v=3', type: 'image/x-icon' },
            { url: '/absent-minded/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
            { url: '/absent-minded/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
        ],
        apple: [
            { url: '/absent-minded/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/absent-minded/favicon.ico?v=3',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Theme appearance="dark">{children}</Theme>
            </body>
        </html>
    );
}
