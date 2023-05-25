"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { cn, replaceEmptyStringWithNull } from "@/lib/utils";
import { Button } from "@/components/ui";
import { FormField } from "./form-field";
import { GenericFormProps } from "./types";

export const GenericForm: FC<GenericFormProps<any>> = ({
  // onCanceled,
  onSuccess,
  action,
  fields,
  onSubmit,
  redirectUrl,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({});

  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);

    const data2 = replaceEmptyStringWithNull(data);
    const finalData = await onSubmit(data2);

    setIsLoading(false);

    startTransition(() => {
      redirectUrl && router.push(redirectUrl);
      router.refresh();
      onSuccess && onSuccess(finalData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={cn((isLoading || isPending) && "opacity-40", "space-y-2")}
    >
      {fields.map((field) => (
        <FormField field={field} register={register} errors={errors} control={control} />
      ))}
      <div className="flex items-center justify-end gap-2">
        {/* <Button
          type="button"
          onClick={onCanceled}
        >
          Cancel
        </Button> */}
        <Button type="submit" className="capitalize">
          {action}
        </Button>
        {onDelete && (
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
      <p className="text-xs">*Ce champ est obligatoire</p>
    </form>
  );
};
