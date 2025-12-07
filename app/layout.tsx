import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/contexts/DataContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Univio - Smart Campus Assistant",
  description: "Kelola jadwal kuliah dan tugas dalam satu tempat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} antialiased`}
      >
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
