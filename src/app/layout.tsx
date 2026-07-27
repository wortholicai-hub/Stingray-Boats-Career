import type { Metadata } from "next";
import { Exo_2, Exo, Barlow } from "next/font/google";
import PageLoader from "./components/PageLoader";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`h-full antialiased ${exo2.variable} ${exo.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
