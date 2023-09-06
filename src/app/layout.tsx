import type { Metadata } from "next";

import { Inter } from "next/font/google";

import Header from "@/components/ui/header";

import { Providers } from "./providers";
import { ProvidersRedux } from "@/redux/provider";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

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
        <ProvidersRedux>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ProvidersRedux>
      </body>
    </html>
  );
}
