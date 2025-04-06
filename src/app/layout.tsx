import type { Metadata } from "next";
import { Geist, Geist_Mono, Paytone_One } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organisms/GlobalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const paytoneOne = Paytone_One({
  variable: "--font-paytone-one",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dialisis Connect Edu",
  description: "Sistem Informasi Berbasis Web untuk penyakit gagal ginjal.",
  keywords:
    "daycare, tempat penitipan anak, daycare terdekat, childcare, layanan anak, tempat penitipan anak terpercaya",
  icons: [
    { rel: "icon", url: "/images/icons/favicon.ico", sizes: "16x16" },
    { rel: "icon", url: "/images/icons/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/images/icons/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paytoneOne.variable} antialiased`}
      >
        <GlobalProvider>
          <main>{children}</main>
        </GlobalProvider>
      </body>
    </html>
  );
}
