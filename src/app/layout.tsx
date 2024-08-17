import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProviders } from "@/styles/ThemeProviders";
import { StoreProviders } from "@/store/StoreProviders";

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
    <StoreProviders>
      <ThemeProviders>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ThemeProviders>
    </StoreProviders>
  );
}
