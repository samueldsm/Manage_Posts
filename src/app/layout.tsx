import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post | Administration",
  description: "Manage the posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="purple-dark text-foreground bg-background">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
