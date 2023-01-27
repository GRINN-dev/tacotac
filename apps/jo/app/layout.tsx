import { Inter as FontSans } from "@next/font/google";

import "@/styles/globals.css";
import { ServerThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }) => {
  return (
    <ServerThemeProvider attribute="class">
      <html lang="fr">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>tacotac.io</title>
          {/* favicon */}
          <link rel="icon" href="/favicon.ico" />
          {/* title and description */}
          <meta
            name="description"
            content="La billeterie de vos évènements de collecte"
          />
          <meta name="og:title" content="tacotac.io" />
          <meta
            name="og:description"
            content="La billeterie de vos évènements de collecte"
          />
          <meta name="og:image" content="/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content="https://tacotac.io" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Napol.io" />
          <meta
            name="twitter:description"
            content="La billeterie de vos évènements de collecte"
          />
          <meta name="twitter:image" content="/og-image.png" />
          <meta name="twitter:site" content="@LecsLouis" />

          {/* fonts */}
        </head>
        <body
          className={cn(
            "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50",
            fontSans.variable
          )}
        >
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
          <TailwindIndicator />
        </body>
      </html>
    </ServerThemeProvider>
  );
};

export default RootLayout;
