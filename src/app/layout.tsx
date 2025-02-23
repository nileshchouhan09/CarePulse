import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "../../lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"



const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"],
  weight:['300',"400","500","600","700","800",],
  variable:'--font-sans'
 });

export const metadata: Metadata = {
  title: "Care Pulse",
  description: "A health care management system",
  icons:{
    icon:"/assets/icons/logo-icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-dark-300 font-sans antialiased",fontSans.variable)}>
        
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster  />
          </ThemeProvider>
        
        
        </body>
    </html>
  );
}
