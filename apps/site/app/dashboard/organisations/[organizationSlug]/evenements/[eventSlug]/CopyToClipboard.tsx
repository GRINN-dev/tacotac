"use client";

import { FC, useState } from "react";
import { Check, Clipboard } from "lucide-react";
import Prism from "prismjs";

import "prismjs/themes/prism-okaidia.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const CopyToClipboard: FC = () => {
  const [copied, setCopied] = useState(false);
  const code = `
  <style>
    .my-iframe {
      width: 700px;
      max-width: 100%;
      height: 900px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
    }
  </style>
  <iframe src="https://www.kaypi-app.vercel.app/inscription/the-organisation/evenements/canto/participant" class="my-iframe" />
  `;

  // Returns a highlighted HTML string
  const html = Prism.highlight(code, Prism.languages.html, "html");
  return (
    <div className="relative">
      <pre id="code-to-copy" className="language-html relative" dangerouslySetInnerHTML={{ __html: html }} />{" "}
      <button
        className={cn(
          "inline-block rounded border border-slate-400 p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
          "absolute top-4 right-2"
        )}
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => setCopied(true));
        }}
      >
        {copied ? <Check className="h-4 w-4 text-slate-400" /> : <Clipboard className="h-4 w-4 text-slate-400" />}
      </button>
    </div>
  );
};
