"use client";

import { FC, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Fonts, GetEventByIdQuery, UpdateEventBrandingInput } from "@/../../@tacotacIO/codegen/dist";
import { useToast } from "@/hooks/use-toast";
import { Inter as FontSans } from "@next/font/google";
import { MinusCircle, PlusCircle } from "lucide-react";
import { SketchPicker } from "react-color";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn, uploadToS3 } from "@/lib/utils";
import { FileDragNDrop } from "@/components/FileDragNDrop";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [awardWinning, setAwardWinning] = useState("");
  const [placeholderEmail, setPlaceholderEmail] = useState(placeholder);
  const [files, setFiles] = useState<File[]>([]);
  const [awardWinningList, setAwardWinningList] = useState<string[]>(awardWinningAssoList || []);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, formState, control, watch } = useForm<UpdateEventBrandingInput>();
  const { toast } = useToast();
  const [displayColorPicker1, setDisplayColorPicker1] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);

  console.log("test");
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
    <form onSubmit={onSubmit} className={cn("mt-4 w-full", isSubmitting && "animate-pulse")}>
      <div
        onClick={() => setDisplayColorPicker1(!displayColorPicker1)}
        className="flex items-center justify-start p-2 text-sm border rounded-md cursor-pointer w-max border-slate-300"
      >
        Choisir couleur 1
        <div
          style={{
            backgroundColor: hex1,
            width: "30px",
            height: "30px",
            border: "2px solid white",
            borderRadius: "30px",
            marginLeft: "10px",
          }}
        >
          {" "}
        </div>
      </div>
      {displayColorPicker1 ? (
        <div className="mt-2 grid w-full items-center gap-1.5">
          <div className="">
            <SketchPicker
              {...register("patch.color1", {
                required: "Couleur requise",
              })}
              defaultValue={color1}
              onChange={(color1) => {
                setSketchPickerColor1(color1);
              }}
              color={sketchPickerColor1}
            />
          </div>
        </div>
      ) : null}
      <div
        onClick={() => setDisplayColorPicker2(!displayColorPicker2)}
        className="flex items-center justify-start p-2 mt-4 text-sm border rounded-md cursor-pointer w-max border-slate-300"
      >
        Choisir couleur 2
        <div
          style={{
            backgroundColor: hex2,
            width: "30px",
            height: "30px",
            border: "2px solid white",
            borderRadius: "30px",
            marginLeft: "10px",
          }}
        >
          {" "}
        </div>
      </div>
      {displayColorPicker2 ? (
        <div className="mt-4 grid w-full items-center gap-1.5">
          <div className="">
            <SketchPicker
              {...register("patch.color2", {
                required: "Couleur requise",
              })}
              defaultValue={color2}
              onChange={(color2) => {
                setSketchPickerColor2(color2);
              }}
              color={sketchPickerColor2}
            />
          </div>
        </div>
      ) : null}

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
              className="w-1/2 aspect-[3/2] rounded-2xl object-cover"
              src={URL.createObjectURL(files[0])}
              alt="preview logo"
            />
          ) : logo ? (
            <img className="w-1/2 aspect-[3/2] rounded-2xl object-cover" src={logo} alt="logo" />
          ) : (
            <div className="w-1/2 aspect-[3/2] rounded-2xl object-cover border border-dashed"></div>
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
        <ul className="pl-4 list-disc">
          {awardWinningAssoList?.map((awardWinning) => (
            <li>{awardWinning}</li>
          ))}
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
            className="inline-flex items-center p-1 text-white border border-transparent rounded-full shadow-sm focus:outline-none"
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

        {awardWinningList?.map((awardWinning, index) => (
          <div
            className="inline-flex items-center p-1 text-white border border-transparent rounded-full shadow-sm focus:outline-none"
            onClick={() => removeItemClick(index)}
          >
            {awardWinning} <MinusCircle className="ml-2" />
          </div>
        ))}
      </div>
      <div className="my-4">
        <Label htmlFor="placeholders">Placeholders</Label>
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
      <div className="flex gap-2 mt-8">
        <button type="submit" className={buttonVariants({ size: "lg" })}>
          Mettre à jour
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-800 line-clamp-3 dark:text-red-300">
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
