"use client";

import { FC, useState } from "react";

import { buttonVariants } from "@/components/ui/button";

const CopyToClipboard: FC = () => {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const newUrl = currentUrl.replace("dashboard/organisation", "inscription");

  const handleCopy = () => {
    navigator.clipboard.writeText(`${newUrl}/participant`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div>
      <button className={buttonVariants({ variant: "outline", size: "lg" })} onClick={() => handleCopy()}>
        Copier lien iFrame
      </button>

      {copied && <span style={{ color: "green" }}>Copié !</span>}
    </div>
  );
};

export default CopyToClipboard;
