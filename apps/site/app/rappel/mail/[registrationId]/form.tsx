"use client";

import { FC, useEffect, useRef, useState, useTransition } from "react";
import Script from "next/script";
import { toast } from "@/hooks/use-toast";
import { GetAttendeesWithoutMailByRegistrationIdQuery } from "@tacotacIO/codegen";
import { useFieldArray, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, validCaptcha } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface iUpdateAttendeeMail extends ExtractType<GetAttendeesWithoutMailByRegistrationIdQuery, "attendees"> {}

export const UpdateAttendeeMailForm: FC<iUpdateAttendeeMail> = ({ nodes }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;

  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<iUpdateAttendeeMail>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "nodes",
  });
  const shouldLog = useRef(true); //solution pour éviter le render two times avec react18 et  useEffect
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      append(nodes); //ici on appends auto les data dans le formulaire afin de les préafficher dans la page
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const isValid = await trigger();
    const { isValidCaptcha } = await validCaptcha();
    if (isValid && isValidCaptcha) {
      setIsLoading(true);

      await sdk().UpdateAttendeeEmailAndSendEmail({
        attendees: data.nodes,
      });

      setIsLoading(false);
      toast({
        title: "Email mis à jour !",
      });
    } else {
      console.log("invalide");
    }
  });
  return (
    <div className="flex w-full flex-col">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ">
        Mettre à jour le mail de mes participants
      </h2>
      <form onSubmit={onSubmit} className={cn("mt-4 space-y-4", isSubmitting && "animate-pulse")}>
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE}`} />
        {fields.map((item, index) => (
          <div className="rounded-lg border p-4" key={item.id}>
            <div className="mt-4 grid items-center gap-1.5">
              <Label htmlFor="firstname">Prénom</Label>
              <Input
                type="text"
                id="firstname"
                placeholder="Prénom"
                disabled={true}
                value={item[index]}
                {...register(`nodes.${index}.firstname`)}
                className="col-span-2"
              />
            </div>
            <div className="mt-4 grid items-center gap-1.5">
              <Label htmlFor="lastname">Nom</Label>
              <Input
                type="text"
                id="lastname"
                placeholder="Nom"
                disabled={true}
                value={item[index]}
                {...register(`nodes.${index}.lastname`)}
                className="col-span-2"
              />
            </div>
            <div className="mt-4 grid items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="mon@email.com"
                value={item[index]}
                {...register(`nodes.${index}.email`, {
                  required: {
                    message: "L'email est obligatoire",
                    value: true,
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Merci d'entrer un email valide",
                  },
                })}
                className="col-span-2"
              />
              <p className="text-red-400">{errors?.nodes?.at(index)?.email?.message}</p>
            </div>
          </div>
        ))}
        <div className="mt-8 flex items-center gap-2">
          <button type="submit" className={buttonVariants({ size: "lg", className: "mr-3" })}>
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};
