"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const titles: Record<string, string> = {
  "/": "Kanrak",
  "/home": "Home",
  "/login": "Login",
  "/signup": "Sign Up",
  "/verifyemail": "Verify Email",
  "/gallery": "Gallery",
  "/calendar": "Calendar",
  "/addmemories": "Add Memory",
  "/about": "Profile",
  "/chat": "Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pageTitle = titles[pathname] || "Welcome";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <html lang="en">
      <head>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
