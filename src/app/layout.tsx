import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSettings } from "../sanity/sanity-utils";

export const metadata: Metadata = {
  title: "Kuwaiti Sudanese Holding Company",
  description: "Official Website for KSHC",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {/* Header موحد */}
        <Header logo={settings?.logo} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
