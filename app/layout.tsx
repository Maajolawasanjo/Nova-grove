import type { Metadata } from "next";
import "./globals.css";
import "./site-pages.css";
import "./integration.css";
import "./multipage.css";
import "./addon.css";
import "./scroll-navigation.css";
import { ScrollNavigation } from "@/components/scroll-navigation";
import { CartProvider } from "@/components/cart-context";

export const metadata: Metadata = {
  title: "Nova Grove — West African Botanical Provisions",
  description: "Small-batch botanical provisions shaped by origin and composed for the modern ritual.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"><CartProvider>{children}<ScrollNavigation/></CartProvider></body>
    </html>
  );
}
