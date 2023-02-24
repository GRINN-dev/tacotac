import { Task } from "graphile-worker";
import { generateQRCode } from "../utils/generateQRCode";
export const sayHi: Task = async (payload, { addJob }) => {
  const { name } = payload as { name?: string };
  console.log("🚀 ~ file: say_hi.ts:5 ~ payload:", payload);
  console.log(`Hi ${name || "Unnamed"}`);
  const qrcode = await generateQRCode(
    JSON.stringify({ name: "Bat", sign_code: "AZE34RT" })
  );
  console.log("🚀 ~ file: say_hi.ts:9 ~ constsayHi:Task= ~ qrcode:", qrcode);
  //!name && addJob("say_hi", { name: "stranger" }); //addJob permet de chainer des jobs : exécuter un job depuis un job en cours d'execution
};

// avec helpers
