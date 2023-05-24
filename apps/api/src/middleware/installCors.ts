import { Express } from "express";
import cors from "cors";

export const installCors = (app: Express) => {
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://kaypi-git-development.vercel.app/",
        // regexp for kaypi + anything + 'vercel.app'
        /https:\/\/kaypi.*.vercel.app$/,
        // kaypi.fr and all its subdomains
        /\.kaypi\.fr$/,
      ],
      credentials: true,
    })
  );
};

//<project-name>-<unique-hash>-<scope-slug>.vercel.app
