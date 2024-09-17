import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/auth/AuthProvider";

export const metadata = {
  title: "Cute Notes App",
  description: "❤️❤️❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={` font-sans antialiased `}>{children}</body>
      </AuthProvider>
    </html>
  );
}
