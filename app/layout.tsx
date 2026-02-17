import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
    <html lang="en">
      <body>
        <Sidebar />
        <main className="pl-16 h-screen overflow-y-auto flex-1">{children}</main>
      </body>
    </html>
  );
}
