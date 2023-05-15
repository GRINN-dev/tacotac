/* eslint-disable @next/next/no-img-element */
"use client";

import { FC } from "react";
import { Control, Controller } from "react-hook-form";

import { FileDragNDrop } from "@/components/FileDragNDrop";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Field } from "../types";

export const FileField: FC<{
  field: Field<any>;
  id: string;
  control: Control<any, any>;
}> = ({ field, id, control }) => {
  return (
    <>
      <Controller
        defaultValue={(field.initialValue || field.defaultValue || null) as any}
        control={control}
        name={field.name}
        render={({ field: { onChange, onBlur, value, ref, name } }) => (
          <div className="grid grid-cols-2 space-x-4">
            <FileDragNDrop
              title="Glissez et déposez une image ou cliquez pour en sélectionner une"
              id={"fileUpload-" + id}
              placeholder={field.placeholder}
              acceptFormat="image/*"
              onFileUpload={(fileUrl) => {
                onChange(fileUrl);
              }}
            />
            {value ? (
              <div className="flex justify-center rounded-xl border border-dashed border-gray-300">
                <img src={value} alt="image" className="object-cover" width={100} height={100} />
              </div>
            ) : field.defaultValue ? (
              <div className="flex justify-center rounded-xl border border-dashed border-gray-300">
                <img src={field.defaultValue as any} alt="image" className="object-cover" width={100} height={100} />
              </div>
            ) : (
              <div className="rounded-xl border border-dashed  border-gray-300"></div>
            )}
          </div>
        )}
      />
    </>
  );
};
