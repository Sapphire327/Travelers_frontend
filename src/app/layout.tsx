import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/screens/header/Header";
import Footer from "@/components/screens/footer/Footer";
import styles from './layout.module.css'
import StoreProvider from "@/store/StoreProvider";
import AuthOnStart from "@/store/auth/AuthOnStart";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({
  subsets: ["latin"],
    variable:'--glob'
});

export const metadata: Metadata = {
    title: "Travelers",
    description: "Путешествие — это возможность открыть новые горизонты, испытать себя и насладиться красотой природы. Мы предлагаем вам отправиться в незабываемые путешествия по живописным уголкам нашей страны",
    openGraph: {
        title: 'Travelers',
        description: "Путешествие — это возможность открыть новые горизонты, испытать себя и насладиться красотой природы. Мы предлагаем вам отправиться в незабываемые путешествия по живописным уголкам нашей страны",
        url: 'https://sapphire.ru ',
        siteName: 'Travelers',
        images: [{ url: 'https://sapphire327.ru/backgrounds/main.png' }]
    },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <StoreProvider>
          <AuthOnStart>
            <html lang="en">
              <body className={`${inter.className}`}>
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
              <div className={styles.wrapper}>
                  <Header></Header>
                  <div className={styles.content}>
                      {children}
                  </div>
                  <Footer></Footer>
              </div>
              </body>
            </html>
          </AuthOnStart>
      </StoreProvider>
  );
}
