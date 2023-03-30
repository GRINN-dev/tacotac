"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold ">Oups</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{"Quelque chose s'est mal passé"}</h1>
        <p className="mt-6 text-base leading-7 ">{"Désolé nous n'avons pas pu trouver la page que vous désirez."}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button onClick={() => router.push("/")} className={buttonVariants({ size: "lg" })}>
            Accueil
          </button>
          <div
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="text-sm font-semibold "
          >
            Réssayer
          </div>
        </div>
      </div>
    </main>
  );
}