import type { Metadata } from "next";
import { Inter, Poppins, Aldrich } from "next/font/google";

import "./globals.css";
import { explainVersionMetadata } from "@/lib/metadata";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
})

const aldrich = Aldrich({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-aldrich",
})

export const metadata: Metadata = explainVersionMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >
            <head>
                <link rel="icon" type="image/png" sizes="any" href="/favicon.png" />
            </head>
            <body className={`${inter.variable} ${poppins.variable} ${aldrich.variable}`} >
                {children}
            </body>
        </html >
    );
}
