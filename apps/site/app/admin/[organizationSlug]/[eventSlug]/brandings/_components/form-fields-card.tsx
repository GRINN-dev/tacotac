"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateFormFieldInput, FieldTypes, GetEventBySlugQuery } from "@tacotacIO/codegen";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export const FormFieldCard: FC<{
  onSuccess?: () => void;
  eventID?: string;
  formField?: GetEventBySlugQuery["eventBySlug"]["formFields"]["nodes"][number];
  isLast?: boolean;
}> = ({ formField, isLast, eventID, onSuccess }) => {
  const { register, handleSubmit, watch, control, formState } = useForm<CreateFormFieldInput>({
    defaultValues: {
      formField: {
        ...formField,
        options: formField?.options?.join(";") as any,
      },
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fieldType = watch("formField.type");
  const hasPlaceholder = [FieldTypes.Email, FieldTypes.Text, FieldTypes.Textarea, FieldTypes.Date].includes(fieldType);
  const hasOptions = [FieldTypes.Select, FieldTypes.Checkbox].includes(fieldType);

  const onSubmit = async (data: CreateFormFieldInput, event) => {
    setIsLoading(true);
    delete data.formField.id;
    delete data.formField.eventId;

    if (formField) {
      if (event.nativeEvent.submitter.name === "button-save") {
        sdk()
          .UpdateFormField({
            input: {
              patch: {
                ...data.formField,
                options: (data.formField.options as any)?.split(";"),
              },
              id: formField.id,
            },
          })
          .then(() => {
            toast({ title: "Champ mis à jour", duration: 2000 });
            setIsLoading(false);
            router.refresh();
          });
      } else if (event.nativeEvent.submitter.name === "button-delete") {
        sdk()
          .DeleteFormField({
            input: {
              id: formField.id,
            },
          })
          .then(() => {
            toast({ title: "Champ supprimé", duration: 2000 });
            setIsLoading(false);
            router.refresh();
          });
      }
    } else {
      sdk()
        .CreateFormField({
          input: {
            formField: {
              ...data.formField,
              options: (data.formField.options as any)?.split(";"),
              eventId: eventID,
            },
          },
        })
        .then(() => {
          toast({ title: "Champ créé", duration: 2000 });
          setIsLoading(false);
          router.refresh();
        });
    }

    onSuccess;
  };

  return (
    <form
      className={cn("mt-4 grid items-center gap-1.5", isLoading && "animate-pulse")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name={"formField.type"}
        control={control}
        render={({ field: { onChange, onBlur, value, ref, name }, fieldState: { error } }) => (
          <>
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={FieldTypes.Text}>Texte</SelectItem>
                  <SelectItem value={FieldTypes.Textarea}>Paragraphe</SelectItem>
                  <SelectItem value={FieldTypes.Select}>Selecteur</SelectItem>
                  <SelectItem value={FieldTypes.Checkbox}>Checkbox</SelectItem>
                  <SelectItem value={FieldTypes.Radio}>Un parmis ...</SelectItem>
                  <SelectItem value={FieldTypes.Date}>Date</SelectItem>
                  <SelectItem value={FieldTypes.Email}>Email</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.message && <p className="text-sm text-red-800 dark:text-red-300">{error?.message}</p>}
          </>
        )}
      />
      <div className="mt-4 grid items-center gap-1.5">
        <Label htmlFor="label">Label</Label>
        <Input
          type="text"
          id="label"
          defaultValue={formField?.label}
          {...register("formField.label", {
            required: "Un label est requis",
          })}
        />
        {formState.errors?.formField?.label && (
          <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.formField?.label?.message}</p>
        )}
      </div>
      {hasPlaceholder && (
        <div className="mt-4 grid items-center gap-1.5">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input type="text" id="placeholder" {...register("formField.placeholder", {})} />
          {formState.errors?.formField?.label && (
            <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.formField?.label?.message}</p>
          )}
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name={"formField.isRequiredForInscriptor"}
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Checkbox
              checked={value}
              onCheckedChange={(e) => {
                onChange(e);
              }}
              defaultChecked={formField?.isRequiredForInscriptor}
            />
          )}
        />
        <label
          htmlFor="is-required-for-inscriptor"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Le champ est requis pour la personne qui fait l&apos;inscription
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name={"formField.isRequiredForAttendee"}
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Checkbox
              checked={value}
              onCheckedChange={(e) => onChange(e)}
              defaultChecked={formField?.isRequiredForAttendee}
            />
          )}
        />
        <label
          htmlFor="is-required-for-attendee"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Le champ est requis pour la personne qui participe à l&apos;évènement
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name={"formField.appliesToAllAttendees"}
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Checkbox
              checked={value}
              onCheckedChange={(e) => onChange(e)}
              defaultChecked={formField?.appliesToAllAttendees}
            />
          )}
        />
        <label
          htmlFor="is-available-for-attendee"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Le champ s&apos;applique aussi aux accompagnants
        </label>
      </div>

      {/* now for the options: if type is select or radio, I want an array of strings */}

      {hasOptions && (
        <div className="mt-4 grid items-center gap-1.5">
          <Label htmlFor="options">
            Options proposées au participant. Sur une ligne séparé par le symbole &apos;; &apos;
          </Label>
          <Input type="text" id="options" {...register("formField.options", {})} />
          {formState.errors?.formField?.label && (
            <p className="text-sm text-red-800 dark:text-red-300">{formState.errors?.formField?.label?.message}</p>
          )}
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <Button type="submit" name="button-save">
            Enregistrer
          </Button>
          {formField?.isDeletable ? (
            <Button type="submit" name="button-delete" variant="secondary">
              Supprimer
            </Button>
          ) : (
            false
          )}
        </div>
      </div>
    </form>
  );
};

export const CreationDialog: FC<{ eventID: string }> = ({ eventID }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <DialogTrigger asChild>
        <Button>Ajouter un champ</Button>
      </DialogTrigger>
      <DialogContent>
        <FormFieldCard
          onSuccess={() => {
            setIsOpen(false);
          }}
          eventID={eventID}
        />
      </DialogContent>
    </Dialog>
  );
};

export const OrderFieldButton: FC<{
  formField?: GetEventBySlugQuery["eventBySlug"]["formFields"]["nodes"][number];
  isLast?: boolean;
}> = ({ formField, isLast }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        disabled={formField?.position === 0}
        className={cn(formField?.position === 0 && "cursor-not-allowed opacity-0")}
        onClick={async () => {
          setIsLoading(true);
          await sdk().UpdateFormField({
            input: {
              id: formField?.id,
              patch: {
                position: formField?.position - 1,
              },
            },
          });

          setIsLoading(false);
          toast({
            title: "Champ déplacé",
          });
          router.refresh();
        }}
      >
        <ArrowUpCircle className="h-3 w-3" />
      </button>
      <button
        disabled={isLast}
        className={cn(isLast && "cursor-not-allowed opacity-0")}
        onClick={async () => {
          setIsLoading(true);
          await sdk().UpdateFormField({
            input: {
              id: formField?.id,
              patch: {
                position: formField?.position + 1,
              },
            },
          });

          setIsLoading(false);
          toast({
            title: "Champ déplacé",
          });
          router.refresh();
        }}
      >
        <ArrowDownCircle className="h-3 w-3" />
      </button>
    </div>
  );
};
