import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "xtwit - Twitter Growth Analyzer",
  description: "Analyze your Twitter account and create a growth plan based on the X algorithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
