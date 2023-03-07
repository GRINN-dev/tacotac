import { run } from "graphile-worker";
import { qrCodeGenPdf, sendEmail } from "./tasks";

const main = async () => {
  const runner = await run({
    connectionString: process.env.DATABASE_URL,
    concurrency: 5,
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: { qrCodeGenPdf, sendEmail },
  });
  await runner.promise;
};
main().catch(error => {
  console.log(error);
  process.exit(1);
});
