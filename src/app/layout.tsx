import type { Metadata } from "next";
import localFont from "next/font/local";
import { Barlow } from "next/font/google";
import PageLoader from "./components/PageLoader";
import "./globals.css";

const eurostile = localFont({
  src: [
    {
      path: "../../public/font/eurostile/eurostile-normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/eurostile/eurostile-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-eurostile",
  display: "swap",
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
      className={`h-full antialiased ${eurostile.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
