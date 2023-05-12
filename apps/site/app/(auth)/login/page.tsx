import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui"
import { Separator } from "@/components/ui/separator"
import { LoginForm } from "./LoginForm"

export default async function LoginPage() {
  return (
    <div className="my-12 px-12">
      <div>
        <h1 className="font-bernier mx-auto -skew-y-6 text-center text-3xl">
          Connexion
        </h1>
        <div className="bg-accent-foreground mx-auto h-1 w-24 -skew-y-6" />
      </div>
      <div className="h-8" />

      <LoginForm />

      <Separator className="mt-4" />
      <div className="flex flex-col items-center">
        <p className="mt-4 text-center">
          Vous n&apos;avez pas encore de compte ?
        </p>
        <Link
          href="/register"
          className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
        >
          Créer un compte
        </Link>
      </div>
    </div>
  )
}
