import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/lib/fontawesome";

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
    <html lang="pt-BR">
      <body className="bg-dark text-light min-vh-100">
        {children}
      </body>
    </html>
  );
}
