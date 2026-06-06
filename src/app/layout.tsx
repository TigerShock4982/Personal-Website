import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGraphField from "@/components/BackgroundGraphField";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Jay Palla | Portfolio",
  description: "Software engineering portfolio for Jay Palla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="fixed inset-0 -z-30 bg-background" />

        <div
          className="fixed inset-0 -z-20 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #184b92 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <BackgroundGraphField />

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 py-12">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
