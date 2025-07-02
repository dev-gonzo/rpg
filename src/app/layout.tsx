import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "RPG System",
  description: "System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark text-light min-vh-100">
         <Providers>{children}</Providers>
      </body>
    </html>
  );
}
