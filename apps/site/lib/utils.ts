import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { sdk } from "./sdk";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// replace empty string with null recursively the functional way using a reducer
export const replaceEmptyStringWithNull = (obj: any) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] && typeof obj[key] === "object") {
      acc[key] = replaceEmptyStringWithNull(obj[key]);
    } else if (obj[key] === "") {
      acc[key] = null;
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const uploadToS3 = async (file: File): Promise<string> => {
  // générer l'url présignée
  const { generatePresignedPost } = await sdk().GeneratePresignedPost({
    key: "Logo_event_" + file?.name,
  });
  // poster dans s3 l'url présignée générée

  const formData = new FormData();
  formData.append("Content-type", file?.type);
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

export const getErrorFromFieldname = (input: { fieldName: string; errorObject: any }) => {
  const path = input.fieldName.split(".");
  const error =
    path.length > 1
      ? getErrorFromFieldname({
          fieldName: path?.slice(1)?.join("."),
          errorObject: input?.errorObject?.[path?.[0]],
        })
      : input?.errorObject?.[path?.[0]];
  return error;
};

export const detailDate = (date?: any) => {
  let today: Date;
  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }
  const completeDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [weekday, day, month, year] = completeDate.split(" ");
  return { weekday, day, month, year, completeDate };
};

export const detailHours = (date: any) => {
  const hour = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const today = new Date().getHours();
  if (date) {
    if (!minutes) {
      return `${hour}H`;
    } else if (minutes.toString().length === 1) {
      return `${hour}H0${minutes}`;
    } else {
      return `${hour}H${minutes}`;
    }
  } else {
    return `${today}H`;
  }
};

/* export const convertDayNames = (day) => {
  if (day === DayOfWeek.Monday) {
    return "Lundi";
  } else if (day === DayOfWeek.Thuesday) {
    return "Mardi";
  } else if (day === DayOfWeek.Wednesday) {
    return "Mercredi";
  } else if (day === DayOfWeek.Thursday) {
    return "Jeudi";
  } else if (day === DayOfWeek.Friday) {
    return "Vendredi";
  } else if (day === DayOfWeek.Saturday) {
    return "Samedi";
  } else if (day === DayOfWeek.Sunday) {
    return "Dimanche";
  }
  return day;
}; */

/* export const convertSlotTypeNames = (slot) => {
  if (slot === SlotType.FreeActivity) {
    return "Activité libre";
  } else if (slot === SlotType.Openings) {
    return "Horaires d'ouverture";
  }
  return slot;
}; */

export const range = (x) => {
  return new Array(x).fill(undefined).map((_, i) => i);
};

/* export const convertActivityTypeKindNames = (kind) => {
  if (kind === ActivityTypeKind.IndoorActivity) {
    return "Activité d'intérieur";
  } else if (kind === ActivityTypeKind.OutdoorActivity) {
    return "Activité d'extérieur";
  } else if (kind === ActivityTypeKind.BoardGame) {
    return "Jeu de société";
  }
  return kind;
}; */

export const intToHourString = (int: number | null | undefined) => {
  if (!int) return null;
  const stringValue = int.toString();
  const hour = stringValue.length === 3 ? "0" + stringValue[0] : stringValue.slice(0, 2);
  const minutes = stringValue.length === 3 ? stringValue.slice(1, 3) : stringValue.slice(2, 4);
  return `${hour}:${minutes}`;
};

export const hourStringToInt = (hourString: string | null | undefined) => {
  if (!hourString) return null;
  return parseInt(hourString.split(":").join(""));
};

export const hourIntToRatio = (hourInt: number | null | undefined) => {
  if (!hourInt) return null;
  // I have 1030 that is 10:30 for instance, I want to convert it to minutes and return that number diveded by 1440 (24*60)
  const hour = hourInt.toString().length === 4 ? hourInt.toString().slice(0, 2) : "0" + hourInt.toString().slice(0, 1);
  const minutes = hourInt.toString().slice(2, 4);
  return (100 * (parseInt(hour) * 60 + parseInt(minutes))) / 1440;
};
