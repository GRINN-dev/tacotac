import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Kaypi</title>
        <meta name="description" content="Next.js template for building apps with Radix UI and Tailwind CSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScrollArea className="container grid items-center w-full h-full gap-6 pt-6 pb-8 max-w-prose md:py-10">
        <Icons.logoWithName className="w-24 h-24 " />

        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl leading-tight tracking-tighter font-zenon-bold text-text sm:text-3xl md:text-5xl lg:text-6xl">
            <span className="opacity-40">Organisez vos</span> évenements <span className="opacity-40">de</span> levée de
            dons <br className="hidden sm:inline" />
            <span className="opacity-40">en toute</span> simplicité.
          </h1>
          <p className="max-w-[700px] text-lg  sm:text-xl">
            Une interface ultra-simple et ergonomique, pour vous permettre de gérer vos inscrits et les rattacher à
            leurs panneaux en un rien de temps.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <Link href={"/admin"} className={buttonVariants({ size: "lg" })}>
            Tableau de bord
          </Link>
          <Link href={"/login"} className={buttonVariants({ size: "lg", variant: "outline" })}>
            Connexion
          </Link>
          {/* <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.scanner}
            className={buttonVariants({ variant: "link", size: "lg" })}
          >
            scanner
          </Link> */}
        </div>
      </ScrollArea>
    </>
  );
}
