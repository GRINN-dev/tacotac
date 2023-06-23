"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEventBySlugQuery } from "@tacotacIO/codegen";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";



import { sdk } from "@/lib/sdk";
import { cn, uploadToS3 } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";


const appearanceFormSchema = z.object({
  imageTicketUrl: z.string().nonempty({ message: "L'image de fond est obligatoire" }),
  // theme: z.enum(["light", "dark"], {
  //   required_error: "Please select a theme.",
  // }),
  // font: z.enum(["inter", "manrope", "system"], {
  //   invalid_type_error: "Select a font",
  //   required_error: "Please select a font.",
  // }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export const TicketThemeForm: FC<{ eventBranding: GetEventBySlugQuery["eventBySlug"]["eventBranding"] }> = ({
  eventBranding,
}) => {
 
  const [image, setImage] = useState<File[]>();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      imageTicketUrl: eventBranding.imageTicketUrl,
    },
  });
  const router = useRouter();
  async function onSubmit(data: AppearanceFormValues) {
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
            src={image as any || eventBranding?.imageTicketUrl || ""}
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
              placeholder={"Glissez une image ici"}
              onFileUpload={(file) => {
                console.log("file: ", file);
                showImage(file);
                setImage(file);
              }}
            ></FileDragNDrop>
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    <option value="inter">Inter</option>
                    <option value="manrope">Manrope</option>
                    <option value="system">System</option>
                  </select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>Set the font you want to use in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the dashboard.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Light</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Dark</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        /> */}

        <Button type="submit">Mettre à jour</Button>
      </form>
    </Form>
  );
};