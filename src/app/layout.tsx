import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "next-themes";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Shoepedi",
    absolute: "Shoepedi",
  },
  description: "Elegant | Stylish | Comfortable Shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
          <Toaster 
  position="top-right" 
  richColors
  duration={3000}
  closeButton
  theme="light" 
  expand 
  visibleToasts={3} 
/>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
