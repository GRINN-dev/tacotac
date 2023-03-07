import { run } from "graphile-worker";
import { qrCodeGenPdf, sendEmail } from "./tasks";

const main = async () => {
  const runner = await run({
    connectionString: process.env.DATABASE_URL,
    concurrency: 5,
    noHandleSignals: false,
    pollInterval: 1000,
<<<<<<< HEAD
    taskList: { qrCodeGenPdf: qrCodeGenPdf, sendEmail: sendEmail },
=======
    taskList: { qrCodeGenPdf, sendEmail },
>>>>>>> main
  });
  await runner.promise;
};
main().catch(error => {
  console.log(error);
  process.exit(1);
});
