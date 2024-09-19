import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/auth/AuthProvider";
import Head from "next/head";

export const metadata = {
  title: "Cute Notes App",
  description: "❤️❤️❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <AuthProvider>
        <body className={` font-sans antialiased `}>{children}</body>
      </AuthProvider>
    </html>
  );
}
