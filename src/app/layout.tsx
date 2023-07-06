import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { GlobalContextProvider } from "@/context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rtklink | Home",
  description: "Your positioning partner in the field",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} md:px-20 lg:px-40`}>
        <GlobalContextProvider>
          <Navbar />
          {children}
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
