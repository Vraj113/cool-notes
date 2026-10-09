import "./globals.css";
import AuthProvider from "@/auth/AuthProvider";

export const metadata = {
  title: "Cute Notes",
  description: "A beautiful little journal for your daily thoughts",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#fff8f3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
