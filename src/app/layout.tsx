import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShieldAlert } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Emergency Assistant",
  description: "AI-powered medical emergency assistant for rapid routing and alerting.",
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
      <body className="min-h-full flex flex-col pt-16">
        <header className="fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center px-6 border-b-0 rounded-none shadow-sm dark:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight ml-1">Med<span className="text-slate-500 font-normal">Assist AI</span></h1>
          </div>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </body>
    </html>
  );
}
