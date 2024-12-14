import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Alert from "./components/main/Alert";
import Footer from "./components/main/Footer";
import { OrderProvider } from "./contexts/OrderContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import Navbar from "./components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Le Flaneur Amsterdam - Second Hand Book Store",
  description:
    "Discover a wide range of affordable, high-quality second-hand books at our online bookstore. Browse, search, and buy your favorite books with ease. Sustainable reading made simple!",
  keywords: ["Second hand book", "Turkish book", "Dutch book", "German Book"],
  openGraph: {
    title: "Le Flaneur Amsterdam - Second Hand Book Store",
    description:
      "Discover a wide range of affordable, high-quality second-hand books at our online bookstore.",
    url: "https://leflaneuramsterdam.com",
    siteName: "Le Flaneur Amsterdam Second Hand Book",
    images: [
      {
        url: "/assets/logo.png/",
        width: 1200,
        height: 630,
        alt: "logo",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <OrderProvider>
            <header>
              <Navbar />
              <Alert />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </OrderProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
