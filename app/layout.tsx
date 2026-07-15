import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CH Rahul — Full-Stack & AI Engineer",
  description: "Portfolio of CH Rahul, a full-stack engineer building web, cloud, and AI products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
