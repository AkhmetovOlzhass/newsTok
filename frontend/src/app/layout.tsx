import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { FilterProvider } from "./contexts/context";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KazVision",
  description: "KazVision - последние новости Казахстана",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="Be3TIDKqeHDNV9gpckmklxJk607G9jIWb_74KVE5sas" />
      </head>
      <body className={inter.className}>
        
        <div className="h-screen">
            <FilterProvider>
                <Header/>
                <Sidebar/>
                {children}
                <Analytics />
            </FilterProvider>
        </div>
      </body>
    </html>
  );
}
