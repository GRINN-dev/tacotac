import fs from "fs";
import hbs from "handlebars";
import path from "path";
import moment from "moment";

moment.locale("fr");

// Construire le chemin absolu vers le répertoire "assets"
export function createHtmlTemplate<T>(data: T, templateName: string) {
  const html = fs.readFileSync(
    path.join(
      __dirname.substring(0, __dirname.lastIndexOf("/") + 1),
      `templates/${templateName}.hbs`
    ),
    {
      encoding: "utf-8",
    }
  );
  console.log("🚀 ~ file: createHtmlTemplate.ts:20 ~ assetsPath:", assetsPath);
  const template = hbs.compile(html);
  const rendered = template({
    ...data,
    assetsUrl: process.env.NEXT_PUBLIC_API_ENDPOINT + "/static",
    createdAt: moment().format("ll"),
  });
  return rendered;
}
