import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Documents App",
  description: "A documents request service",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
  <SessionProvider session={session}>
    <html lang="en">
      <body
        className={inter.className}
      >

        {children}
        <Toaster />
      </body>
    </html>
  </SessionProvider>
  );
}
