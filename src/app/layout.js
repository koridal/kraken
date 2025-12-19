import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kraken World",
  description:
    "An interactive Kraken-themed learning world for kids. Learn, earn pearls, and unlock ocean videos and games.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-50 antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.2),transparent_58%)]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.45),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(45,212,191,0.32),transparent_55%)] opacity-70 mix-blend-screen" />

            <div className="relative z-10 flex min-h-screen flex-col">
              <NavBar />
              <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-4 md:px-8 md:pb-16 md:pt-8">
        {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

