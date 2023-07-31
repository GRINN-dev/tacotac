"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { sdk } from "@/lib/sdk";
import { uploadToS3 } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const appearanceFormSchema = z.object({
  imageTicketUrl: z.string().nonempty({ message: "L'image de fond est obligatoire" }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export const TicketThemeForm: FC<{ eventBranding: GetEventBySlugQuery["eventBySlug"]["eventBranding"] }> = ({
  eventBranding,
}) => {
  const [image, setImage] = useState<File[]>();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      imageTicketUrl: eventBranding?.imageTicketUrl,
    },
  });
  const router = useRouter();
  async function onSubmit(data: AppearanceFormValues) {
    console.log("🚀 ~ file: ticket-theme-form.tsx:41 ~ onSubmit ~ data:", data);
    const img = await uploadToS3(image[0]);
    sdk()
      .UpdateEventBranding({
        input: {
          id: eventBranding.id,
          patch: {
            imageTicketUrl: img,
          },
        },
      })
      .then(() => {
        toast({ title: "Champ mis à jour", duration: 2000 });
        router.refresh();
      })
      .catch(() => {
        toast({ title: "Erreur lors de la mise à jour", duration: 2000 });
      });
  }

  function showImage(e: any) {
    const reader = new FileReader();
    const file = e[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as any);
      };
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-center space-x-4">
          <Image
            src={(image as any) || eventBranding?.imageTicketUrl || ""}
            width={300}
            height={200}
            className=" rounded-2xl object-cover"
            alt="image-ticket"
          />
          <div className="aspect-[3/2] w-full rounded-2xl object-cover">
            <FileDragNDrop
              title={"image"}
              id={"nop"}
              acceptFormat={"image/*"}
              placeholder={"Glissez une image ici de type png, jpg, svg, webp et de taille inférieure à 10Mo"}
              maxSize={1024 * 1024}
              onFileUpload={(file) => {
                console.log("file: ", file);
                showImage(file);
                setImage(file);
              }}
            ></FileDragNDrop>
          </div>
        </div>

        <Button type="submit">Mettre à jour</Button>
      </form>
    </Form>
  );
};