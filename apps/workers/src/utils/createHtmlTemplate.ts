import fs from "fs";
import hbs from "handlebars";
import path from "path";
import moment from "moment";

moment.locale("fr");

export function createHtmlTemplate<T>(data: T, templateName: string) {
  console.log(
    "🚀 ~ file: createHtmlTemplate.ts:12 ~ __dirname:",
    __dirname.substring(0, __dirname.lastIndexOf("/") + 1)
  );

  const html = fs.readFileSync(
    path.join(
      __dirname.substring(0, __dirname.lastIndexOf("/") + 1),
      `templates/${templateName}.hbs`
    ),
    {
      encoding: "utf-8",
    }
  );
  const template = hbs.compile(html);
  const rendered = template({
    ...data,
    assetsUrl: process.env.ASSETS_URL || process.env.API_URL,
    createdAt: moment().format("ll"),
  });
  return rendered;
}
