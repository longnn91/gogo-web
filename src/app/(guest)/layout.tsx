import { GuestLayoutRouter } from "@/components/Feature/Layout/GuestLayout/GuestLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gogo web app",
  description: "Gogo web app",
};

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestLayoutRouter>{children}</GuestLayoutRouter>;
}
