import type { Metadata } from "next";
import { inter, russoOne } from "@/utils/font";
import { AuthProvider } from "../context/authContext";
import { WalletProvider } from "@/auth/nearAuth";
import { Analytics } from '@vercel/analytics/next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import "./index.css";


export const metadata: Metadata = {
  title: "NearGami",
  description: "Play to learn & learn to earn",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className={`${inter.variable} ${russoOne.variable}`}>
        <AuthProvider>
          <WalletProvider>
            <main><NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider></main>
            <Analytics />
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
