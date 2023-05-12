import { Inter as FontSans } from "@next/font/google";
import localFont from "@next/font/local";

import "@/styles/globals.css";
import { ServerThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontZenonBold = localFont({
  src: "../public/fonts/Zenon-Bold-Test.woff",
  display: "swap",
  variable: "--font-zenon-bold",
  style: "normal",
  weight: "700",
});

const fontZenonRegular = localFont({
  src: "../public/fonts/Zenon-Regular-Test.woff",
  display: "swap",
  variable: "--font-zenon-regular",
  style: "normal",
  weight: "400",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="fr" className="relative m-0 h-screen border-none">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kaypi</title>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* title and description */}
        <meta name="description" content="La billeterie de vos évènements de collecte" />
        <meta name="og:title" content="kaypi" />
        <meta name="og:description" content="La billeterie de vos évènements de collecte" />
        <meta name="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://kaypi.fr" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Napol.io" />
        <meta name="twitter:description" content="La billeterie de vos évènements de collecte" />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@LecsLouis" />

        {/* fonts */}
      </head>
      <body
        className={cn(
          "bg-bg text-text font-sans antialiased",
          "!absolute inset-4 flex border-4 border-amber-500",
          fontSans.variable,
          fontZenonBold.variable,
          fontZenonRegular.variable
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
