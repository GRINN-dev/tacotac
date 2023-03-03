import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Kaypi</title>
        <meta name="description" content="Next.js template for building apps with Radix UI and Tailwind CSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            <span className="opacity-40">Organisez vos</span> évenements <span className="opacity-40">de</span> collecte{" "}
            <br className="hidden sm:inline" />
            <span className="opacity-40">en toute</span> simplicité.
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Une interface ultra-simple et ergonomique, pour vous permettre de gérer vos inscrits et les rattacher à
            leurs panneaux en un rien de temps.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={siteConfig.links.dashboard} className={buttonVariants({ size: "lg" })}>
            dashboard
          </Link>
          <Link href={siteConfig.links.inscription} className={buttonVariants({ size: "lg" })}>
            inscription
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.scanner}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            scanner
          </Link>
        </div>
      </section>
    </>
  );
}
