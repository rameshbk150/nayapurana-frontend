
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar data={siteData} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
