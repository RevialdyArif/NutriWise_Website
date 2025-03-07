import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriWise",
  description: "NutriWise helps you go beyond calorie counting, encouraging you to understand and improve your overall nutrition for a healthier life.",
};

const RootLayout = async ({ children }: { children: ReactNode }) =>  {
  const session = await auth();
    
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
export default RootLayout;
