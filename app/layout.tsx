import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Superquotes",
  description:
    "Superquotes is a platform for sharing quotes and inspirational messages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
