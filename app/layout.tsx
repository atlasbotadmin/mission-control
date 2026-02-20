import type { Metadata } from "next";
import { Oxanium, Exo_2 } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Personal mission control dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${exo2.variable}`}>
      <body className={exo2.className}>
        <Sidebar />
        <main className="pl-16 h-screen overflow-y-auto flex-1">{children}</main>
      </body>
    </html>
  );
}
