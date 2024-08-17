import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "@/styles/ThemeProviders";

export const metadata: Metadata = {
  title: "GoGo web app",
  description: "GoGo web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviders>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProviders>
  );
}
