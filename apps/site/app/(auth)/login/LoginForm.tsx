"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/../../@tacotacIO/codegen/dist";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { GenericForm } from "@/components/form/generic-form";
import { Button, Input, Label, buttonVariants } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { getLoginFormProps } from "./loginFormProps";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    await sdk().Login({
      input: {
        ...data,
      },
    });
    setLoading(false);
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
      </form>

      <Separator className="mt-4" />
    </div>
  );
};
