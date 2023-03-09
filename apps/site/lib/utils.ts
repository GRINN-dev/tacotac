import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";





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