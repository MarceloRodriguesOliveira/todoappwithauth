import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth-providers";
import Footer from "@/components/Footer";
import { TaskProvider } from "@/contexts/TasksProvider";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <TaskProvider>
        <html lang="en">
          <body>
            <div className="min-h-screen flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
          </body>
        </html>
      </TaskProvider>
    </AuthProvider>
  );
}
