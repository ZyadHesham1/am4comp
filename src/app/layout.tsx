import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <-- THIS LINE IS CRITICAL. IT LOADS ALL YOUR STYLES.
import { cn } from "@/lib/utils";
import { Header } from "@/components/shared/Header";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Footer } from "@/components/shared/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AM4Computers - Your Tech Partner",
  description: "Distributor of HP, Xerox, and more.",
};

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html lang={lng} dir={lng === "ar" ? "rtl" : "ltr"}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <Header />
        <main>
          <Breadcrumbs />
          {children}</main> {/* Your page content will be rendered here */}
        <Footer /> 
      </body>
    </html>
  );
} 