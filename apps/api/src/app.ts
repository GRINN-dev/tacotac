import Express, { static as staticMiddleware } from "express";
import {
  installPostgraphile,
  installDatabasePools,
  installCors,
  installVoyager,
  installCaptcha,
} from "./middlewares";

export const makeApp = () => {
  const app = Express();

  installCors(app);
  installDatabasePools(app);
  installPostgraphile(app);
  installVoyager(app);
  installCaptcha(app);
  return app;
};
