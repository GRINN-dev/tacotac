import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams: { redirect },
}: {
  searchParams: {
    redirect?: string;
  };
}) {
  return (
    <div className="my-12 px-12">
      <div>
        <h1 className=" mx-auto text-center text-3xl font-bold">Connexion</h1>
      </div>
      <div className="h-8" />

      <LoginForm redirect={redirect} />

      <Separator className="mt-4" />
      <div className="flex flex-col items-center">
        <p className="mt-4 text-center">Vous n&apos;avez pas encore de compte ?</p>
        <Link
          href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
          className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
