import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Kitchen Gas & Fire Alert System",
  description: "Group 4 IoT final project pitch deck",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
