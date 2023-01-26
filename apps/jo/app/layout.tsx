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
          <title>Document</title>
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
