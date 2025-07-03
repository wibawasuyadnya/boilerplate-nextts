import "./globals.css";
import type { Metadata } from "next";
import FlyonuiScript from "./FlyonuiScript";
import { Providers } from "@/redux/provider";
import ReactQueryProvider from "./react-query-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import ThemeWrapper from "@/components/Layout-Components/ThemeWrapper";
import { Exo_2 } from 'next/font/google'
import React from "react";
import ThemeInitializer from "@/components/Layout-Components/ThemeInitializer";

const exo2 = Exo_2({ subsets: ['latin'] })

// Environment detection
const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

// Dynamic metadata
export const metadata: Metadata = {
  title: isProduction ? "Boilerpate-NextTS" : "Kroom Game",
  description: isProduction ? "Boilerpate-NextTS" : "Kroom Game",
  robots: {
    index: isProduction ? true : false,
    follow: isProduction ? true : false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dynamic favicon and icon paths
  const faviconPaths = isProduction ? {
    icon96: "/production/favicon-96x96.png",
    iconSvg: "/production/favicon.svg",
    shortcut: "/production/favicon.ico",
    appleTouch: "/production/apple-touch-icon.png",
    appTitle: "PredikGame"
  } : {
    icon96: "/staging/favicon-96x96.png", 
    iconSvg: "/staging/favicon.svg",   
    shortcut: "/staging/favicon.ico", 
    appleTouch: "/staging/apple-touch-icon.png", 
    appTitle: "Kroom Game"
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href={faviconPaths.icon96} sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href={faviconPaths.iconSvg} />
        <link rel="shortcut icon" href={faviconPaths.shortcut} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="180x180" href={faviconPaths.appleTouch} />
        <meta name="apple-mobile-web-app-title" content={faviconPaths.appTitle} />
        <meta name="theme-color" content={isProduction ? "#ffffff" : "#000000"} />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${exo2.className} antialiased`}
      >
        <Providers>
          <ReactQueryProvider>
            <ThemeInitializer />
            <ThemeWrapper>
              <div className="container">
                <React.StrictMode>
                  {children}
                </React.StrictMode>
              </div>
              <GoogleAnalytics gaId="" />
            </ThemeWrapper>
            <FlyonuiScript />
          </ReactQueryProvider>
        </Providers>
      </body>
    </html >
  );
}