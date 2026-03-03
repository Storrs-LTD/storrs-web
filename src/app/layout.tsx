import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Storrs – More Sales Through WhatsApp",
  description:
    "Storrs helps you run marketing, sales, and delivery on WhatsApp so every chat becomes an opportunity to close a deal.",
  openGraph: {
    title: "Storrs – More Sales Through WhatsApp",
    description:
      "Turn WhatsApp conversations into repeat customers. Marketing, sales, and delivery — all in one WhatsApp-first workflow.",
    siteName: "Storrs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Storrs – More Sales Through WhatsApp",
    description:
      "Turn WhatsApp conversations into repeat customers. Marketing, sales, and delivery — all in one WhatsApp-first workflow.",
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

