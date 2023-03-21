import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { sdk } from "./sdk";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validCaptcha = (): Promise<{ isValidCaptcha: boolean }> => {
  return new Promise(async (resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE, { action: "submit" });

        const body = {
          gRecaptchaToken: token,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/verify_captcha`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        resolve({ isValidCaptcha: !!response.ok });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const uploadToS3 = async (file: File): Promise<string> => {
  // générer l'url présignée
  const { generatePresignedPost } = await sdk().GeneratePresignedPost({
    key: "Logo_event_" + file?.name,
  });
  // poster dans s3 l'url présignée générée

  const formData = new FormData();
  formData?.append("Content-type", file.type);
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
