import { Express, static as staticMiddleware } from "express";

export default (app: Express) => {
  console.log(__dirname);
  app.use("/static", staticMiddleware(`${__dirname}/../public`));
};
