import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { GlobalContextProvider } from "@/context/store";
import { defaultLocale } from "../middleware";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rtklink | Home",
  description: "Your positioning partner in the field",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body className={`${inter.className} lg:px-40 md:px-10`}>
        <GlobalContextProvider>
          <Navbar />
          {children}
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
