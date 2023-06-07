"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginInput } from "@tacotacIO/codegen";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { GoogleAuth } from "@/components/google-auth";
import { Button, Input, Label, buttonVariants } from "@/components/ui";
import { Separator } from "@/components/ui/separator";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    await sdk()
      .Login({
        input: {
          ...data,
        },
      })
      .catch((e) => setError(e));
    setLoading(false);
    window.location.replace("/admin");
  };
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center xl:max-w-[500px]",
        isLoading && "pointer-events-none animate-pulse"
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center gap-4">
        <Label htmlFor={"email"} className={cn("flex w-full flex-col")}>
          Email
          <Input
            type="email"
            id={"email"}
            {...register("username", {
              required: true,
            })}
          />
        </Label>
        <Label htmlFor={"password"} className={cn("flex w-full flex-col")}>
          Mot de passe
          <Input
            type="password"
            id={"password"}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
        </Label>
        <Button type="submit">Se connecter</Button>
        <Link className={buttonVariants({ variant: "link" })} href="/mot-de-passe-oublie">
          mot de passe oublié
        </Link>
        {error && <p>{error}</p>}
      </form>

      <Separator className="mt-4" />
      <div className="mt-4 flex justify-center">
        <GoogleAuth
          clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
          handleCredentialResponse={async (response) => {
            setLoading(true);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google/authenticate?token=${response.credential}`,
              {
                method: "POST",
                credentials: "include",
              }
            ).then((res) => res.json());
            setLoading(false);
            res?.ok && window.location.replace("/admin");
          }}
        />
      </div>
    </div>
  );
};
