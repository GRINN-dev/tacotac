import { Express } from "express";
import cors from "cors";

export const installCors = (app: Express) => {
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://chez-daddy-git-development.vercel.app/",
        // regexp for chez-daddy + anything + 'vercel.app'
        /https:\/\/chez-daddy.*.vercel.app$/,
      ],
      credentials: true,
    })
  );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
