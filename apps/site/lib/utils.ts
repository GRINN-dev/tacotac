import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { sdk } from "./sdk";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadToS3 = async (file: File): Promise<string> => {
  // générer l'url présignée
  const { generatePresignedPost } = await sdk().GeneratePresignedPost({
    key: "Logo_event_" + file.name,
  });
  // poster dans s3 l'url présignée générée

  const formData = new FormData();
  formData.append("Content-type", file.type);
  Object.entries(generatePresignedPost.fields).forEach(([k, value]: any) => {
    formData.append(k, value);
  });
  formData.append("file", file);
  await fetch(generatePresignedPost.url, {
    method: "POST",
    body: formData,
  });
  return generatePresignedPost.url + "/" + generatePresignedPost.fields.key;
};