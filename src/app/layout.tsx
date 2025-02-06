

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// Import other providers if needed
import { CartProvider } from "../app/context/cartcontext";
import { ClerkProvider } from "@clerk/nextjs"; // ✅ Correct import


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin panel secured with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
     <ClerkProvider>  
      <html lang="en">
       
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CartProvider>
            {children}
          </CartProvider>
        </body>
        
      </html>
      
      </ClerkProvider>
    
   
  );
}
