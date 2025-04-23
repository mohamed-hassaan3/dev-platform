import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarPage } from "../modules/SidebarModule";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev-Platform",
  description:
    "Dev-Platform if you have a new idea to share with Developers let's grow up together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                >
                <SidebarPage>
                  {children}
                </SidebarPage>
              </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
