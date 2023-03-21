import { Task } from "graphile-worker";

interface WebHookZapierMakePayload {}

export const sendWebHookZapierMake: Task = async (
  payload,
  { addJob, withPgClient }
) => {
  const { webhookZapierMakePayload } = payload as {
    webhookZapierMakePayload: WebHookZapierMakePayload;
  };

  await fetch("https://hook.eu1.make.com/m71ivakh5nnwknu1zwmdefle1u2c1qjs", {
    method: "POST",
    body: JSON.stringify({
      webhookZapierMakePayload: webhookZapierMakePayload,
    }),
  });
};
