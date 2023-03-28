"use client";

import { FC, useState } from "react";

import { buttonVariants } from "@/components/ui/button";

const CopyToClipboard: FC = () => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        className={buttonVariants({ variant: "outline", size: "lg", className: "mx-auto" })}
        onClick={() => {
          const el = document.getElementById("code-to-copy");
          navigator.clipboard.writeText(el.innerText).then(() => setCopied(true));
        }}
      >
        {copied ? "Copié !" : "Copier le code"}
      </button>
      <pre
        id="code-to-copy"
        className="px-2 py-4 mt-6 mb-4 overflow-x-auto border rounded-lg border-slate-900 bg-slate-900 dark:border-slate-700 dark:bg-black"
      >
        <code className="flex flex-col">
          <div className="flex">
            <span className="text-yellow-300 ">&lt;</span>
            <span className="text-yellow-300">style</span>
            <span className="text-yellow-300">&gt;</span>
          </div>
          <div>
            <span className="ml-2 text-white">.my-iframe {"{"}</span>
          </div>
          <div className="ml-6 text-white">width: 700px;</div>
          <div className="ml-6 text-white">max-width: 100%;</div>
          <div className="ml-6 text-white">height: 900px;</div>
          <div className="ml-6 text-white">border: 1px solid #ccc;</div>
          <div className="ml-6 text-white">border-radius: 5px;</div>
          <div className="ml-6 text-white">box-shadow: 0 0 5px #ccc;</div>
          <div className="ml-2 text-white ">{"}"}</div>

          <span className="text-yellow-300"> &lt;/style&gt;</span>
          <br />
          <span className="text-yellow-300">&lt;iframe</span>
          <span className="text-white"> src=&quot;</span>
          <span className="text-white">
            https://www.kaypi-app.vercel.app/inscription/the-organisation/evenements/canto/participant&quot;
          </span>

          <span className="text-white">class=&quot;my-iframe&quot;</span>
          <span className="text-yellow-300">/&gt;</span>
        </code>
      </pre>
    </div>
  );
};

export default CopyToClipboard;
