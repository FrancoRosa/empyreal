import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { GlobalContextProvider } from "@/context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "empyreal | Home",
  description: "Your positioning partner in the field",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
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
