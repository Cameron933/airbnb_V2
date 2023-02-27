import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
    </html>
  );
}
