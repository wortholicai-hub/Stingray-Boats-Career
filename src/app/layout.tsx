import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Careers | Stingray Boats",
  description:
    "Join the Stingray Boats team in Hartsville, SC. View open positions and career opportunities at one of the nation's leading independent boat builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
