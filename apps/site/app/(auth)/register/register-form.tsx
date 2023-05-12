"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterInput } from "@/../../@tacotacIO/codegen/dist";
import { useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { GenericForm } from "@/components/form/generic-form";
import { Button, Input, Label } from "@/components/ui";
import { Separator } from "@/components/ui/separator";

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();
  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    await sdk().RegisterUser({
      input: {
        ...data,
      },
    });
    setLoading(false);
  };
  return (
    <div
      className={cn(
        "flex min-w-[500px] flex-col items-center justify-center",
        isLoading && "pointer-events-none animate-pulse"
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center gap-4">
        <Label htmlFor={"firstname"} className={cn("flex w-full flex-col")}>
          Prénom
          <Input
            type="text"
            id={"firstname"}
            {...register("firstname", {
              required: true,
            })}
          />
          {errors.firstname && <span className="text-red-500">Ce champ est requis</span>}
        </Label>
        <Label htmlFor={"lastname"} className={cn("flex w-full flex-col")}>
          Nom
          <Input
            type="text"
            id={"lastname"}
            {...register("lastname", {
              required: true,
            })}
          />
          {errors.lastname && <span className="text-red-500">Ce champ est requis</span>}
        </Label>
        <Label htmlFor={"email"} className={cn("flex w-full flex-col")}>
          Email
          <Input
            type="email"
            id={"email"}
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <span className="text-red-500">Ce champ est requis</span>}
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
          {errors.password && <span className="text-red-500">Ce champ est requis</span>}
        </Label>
        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  );
};
