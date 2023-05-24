"use client";

import { FC, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui";

export const IFrameViewer: FC<{ href: string }> = ({ href }) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  /*
  // resize iframe when clicking handle

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const iframe = iframeRef.current;
    const handle = handleRef.current;
    if (!iframe || !handle) return;
    const newWidth = e.clientX - iframe.getBoundingClientRect().left;
    iframe.style.width = `${newWidth}px`;
    handle.style.left = `${newWidth}px`;
  };

  const handleMouseLeave = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
 */
  const [smallView, setSmallView] = useState(false);
  return (
    <>
      <style>
        {`  .my-iframe {
      width: 700px;
      max-width: 100%;
      height: 900px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
    }`}
      </style>
      <Switch
        checked={smallView}
        onCheckedChange={(checked) => {
          setSmallView(checked);
        }}
      />

      <div className={cn("relative ", smallView && "max-w-sm")}>
        <iframe src={href} className="my-iframe" ref={iframeRef} />
        {/*   <div
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize rounded-full bg-black/50"
        /  ref={handleRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        /> */}
      </div>
    </>
  );
};
