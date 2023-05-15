"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Fonts, GetEventByIdQuery, UpdateEventBrandingInput } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle } from "lucide-react";
import { SketchPicker } from "react-color";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, uploadToS3 } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface IUpdateBrandingEvent extends ExtractType<ExtractType<GetEventByIdQuery, "event">, "eventBranding"> {}

export const UpdateEventBrandingForm: FC<IUpdateBrandingEvent> = ({
  id,
  color1,
  color2,
  font,
  logo,
  placeholder,
  richText,
  shortText,
  awardWinningAssoList,
  headerMailName,
  headerMailContact,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [awardWinning, setAwardWinning] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [awardWinningList, setAwardWinningList] = useState<string[]>(awardWinningAssoList || []);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control } = useForm<UpdateEventBrandingInput>();
  const { toast } = useToast();
  const [displayColorPicker1, setDisplayColorPicker1] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (files.length > 0) {
      const url = await uploadToS3(files[0]);

      data.patch.logo = url;
    } else {
      data.patch.logo = logo;
    }
    data.id = id;
    data.patch.awardWinningAssoList = awardWinningList;
    data.patch.color1 = sketchPickerColor1.hex.substring(1);
    data.patch.color2 = sketchPickerColor2.hex.substring(1);
    data.patch.placeholder = jsonData;
    await sdk()
      .UpdateEventBranding({
        input: data,
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      router.push(pathname + "?reload=true");

      toast({
        title: "Formulaire mis à jour",
        //description: "Friday, February 10, 2023 at 5:57 PM",
      });
    });
  });

  const removeItemClick = (index: number) => {
    const newList = [...awardWinningList];
    newList.splice(index, 1);
    setAwardWinningList(newList);
  };
  const { nom, prenom, email, telephone, zipcode } = placeholder || {};

  const [jsonData, setJsonData] = useState({
    nom: "Nom",
    prenom: "Prénom",
    email: "Email",
    telephone: "Téléphone",
    zipcode: "Code postal",
  });
  const [sketchPickerColor1, setSketchPickerColor1] = useState({
    hex: color2,
  });
  const [sketchPickerColor2, setSketchPickerColor2] = useState({ hex: color1 });
  const { hex: hex1 } = sketchPickerColor1;
  const { hex: hex2 } = sketchPickerColor2;

  const handleJsonChange = (e) => {
    const { name, value } = e.target;
    setJsonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={onSubmit} className={cn("mt-12 w-full", isSubmitting && "animate-pulse")}>
      <h2 className="mb-6 text-3xl font-bold">Contenus</h2>

      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Controller
          name={"patch.font"}
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <Select defaultValue={font} onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Police" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={Fonts.Roboto}>Roboto</SelectItem>
                    <SelectItem value={Fonts.Montserrat}>Montserrat</SelectItem>
                    <SelectItem value={Fonts.Opensans}>Open Sans</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
            </>
          )}
        />
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="logo">Logo</Label>
        <div className="flex flex-row space-x-4">
          <FileDragNDrop
            id={"fileDnD" + id}
            title={"Logo"}
            placeholder="Glissez vos images ici"
            acceptFormat="image/*"
            onFileUpload={(file) => {
              setFiles(file);
            }}
          />
          {files.length > 0 ? (
            <img
              className="aspect-[3/2] w-1/2 rounded-2xl object-cover"
              src={URL.createObjectURL(files[0])}
              alt="preview logo"
            />
          ) : logo ? (
            <img className="aspect-[3/2] w-1/2 rounded-2xl object-cover" src={logo} alt="logo" />
          ) : (
            <div className="aspect-[3/2] w-1/2 rounded-2xl border border-dashed object-cover"></div>
          )}
        </div>

        {formState.errors?.patch?.logo && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.logo?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label htmlFor="richText">Contenu rich text</Label>
        <Textarea
          id="richText"
          defaultValue={richText}
          placeholder="type url here"
          {...register("patch.richText", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.richText && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.richText?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label htmlFor="shortText">Court texte</Label>
        <Input
          type="text"
          id="shortText"
          defaultValue={shortText}
          placeholder="Entrez un texte court ici"
          {...register("patch.shortText", {
            required: "Un texte est requis",
          })}
        />
        {formState.errors?.patch?.shortText && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.shortText?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        {/* A remplacer par list */}
        <Label>Liste des lauréats</Label>

        <ul className="list-disc pl-4">
          {awardWinningList.length > 0
            ? awardWinningList?.map((awardWinning, index) => (
                <li key={awardWinning + index}>
                  <div
                    className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm focus:outline-none"
                    onClick={() => removeItemClick(index)}
                  >
                    {awardWinning} <MinusCircle className="ml-2" />
                  </div>
                </li>
              ))
            : "Aucun lauréat pour le moment"}
        </ul>

        <Label className="mt-2" htmlFor="awardWinningAssoList">
          Modifier la liste des lauréats
        </Label>
        <div className="flex space-x-4">
          <Input
            type="text"
            id="awardWinningAssoList"
            value={awardWinning}
            placeholder="Saisir un lauréat"
            onChange={(evt) => setAwardWinning(evt?.currentTarget?.value)}
          />
          <div
            className="inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm focus:outline-none"
            onClick={() => {
              if (awardWinning) {
                setAwardWinningList([...awardWinningList, awardWinning]);
                setAwardWinning("");
              }
            }}
          >
            Ajouter <PlusCircle className="ml-2" />
          </div>
        </div>
      </div>
      <div className="my-4">
        <Label htmlFor="placeholders" className="font-semibold">
          Placeholders
        </Label>
      </div>

      <div>
        <Label htmlFor="placeholder-name">Placeholder nom</Label>
      </div>
      <div>
        <Input
          className="mb-4"
          type="text"
          id="nom"
          name="nom"
          defaultValue={nom}
          placeholder={jsonData.nom}
          onChange={handleJsonChange}
        />
      </div>
      <div>
        <Label htmlFor="placeholder-prenom">Placeholder prénom</Label>
      </div>
      <div>
        <Input
          className="mb-4"
          type="text"
          id="prenom"
          name="prenom"
          defaultValue={prenom}
          placeholder={jsonData.prenom}
          onChange={handleJsonChange}
        />
      </div>
      <div>
        <Label htmlFor="placeholder-phone">Placeholder téléphone</Label>
      </div>
      <Input
        className="mb-4"
        type="tel"
        id="telephone"
        defaultValue={telephone}
        name="telephone"
        placeholder={jsonData.telephone}
        onChange={handleJsonChange}
      />
      <div>
        <Label htmlFor="placeholder-zip">Placeholder code postal</Label>
      </div>
      <Input
        className="mb-4"
        type="text"
        id="zipcode"
        defaultValue={zipcode}
        name="zipcode"
        placeholder={jsonData.zipcode}
        onChange={handleJsonChange}
      />
      <div>
        <Label htmlFor="placeholder-email">Placeholder email</Label>
      </div>
      <div>
        <Input
          className="mb-4"
          type="text"
          defaultValue={email}
          id="email"
          name="email"
          placeholder={jsonData.email}
          onChange={handleJsonChange}
        />
      </div>

      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="headerMailName">Header Mail - Intitulé</Label>
        <Input
          type="text"
          id="headerMailName"
          defaultValue={headerMailName}
          placeholder="Saisir l'intitulé du header"
          {...register("patch.headerMailName", {
            required: "Un nom pour l'organisation est requis",
          })}
        />
        {formState.errors?.patch?.headerMailName && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.color2?.message}</p>
        )}
      </div>
      <div className="mt-4 grid w-full items-center gap-1.5">
        <Label htmlFor="headerMailContact">Header Mail - Contact</Label>
        <Input
          type="email"
          id="headerMailContact"
          defaultValue={headerMailContact}
          placeholder="mon@email.com"
          {...register("patch.headerMailContact", {
            required: "Un email est requis",
          })}
        />
        {formState.errors?.patch?.headerMailContact && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.patch?.color2?.message}</p>
        )}
      </div>
      <div className="mt-8 flex gap-2">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Mettre à jour
        </button>
      </div>
      {error && (
        <p className="line-clamp-3 mt-2 text-sm text-red-800 dark:text-red-300">
          {JSON.stringify(
            error,
            (key, value) => {
              if (key === "response") {
                return undefined;
              }
              return value;
            },
            2
          )}
        </p>
      )}
    </form>
  );
};
