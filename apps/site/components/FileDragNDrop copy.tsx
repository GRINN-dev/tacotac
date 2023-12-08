import { ChangeEvent, DragEvent, FC, useState } from "react";

import { cn, uploadToS3 } from "@/lib/utils";

export interface FileDragNDropProps {
  id: string;
  acceptFormat: string;
  placeholder: string;
  onFileUpload: (url: string) => void;
}

export const FileDragNDrop: FC<FileDragNDropProps> = ({ onFileUpload, id, acceptFormat, placeholder }) => {
  const [loading, setLoading] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    loadFile(file);
  };

  const loadFile = async (file: File) => {
    setLoading(true);
    const fileUrl = await uploadToS3(file);
    onFileUpload(fileUrl);
    setLoading(false);
  };
  //permet de récup fichiers dans DocumentUploadCard

  const fileUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    // max file size 10mb
    const maxFileSize = 10 * 1024 * 1024;
    // alert if a file is too big
    if (e.target.files && e.target.files[0].size > maxFileSize) {
      alert("Le fichier est trop volumineux");
      return;
    }
    const file = e.target.files[0];
    loadFile(file);
  };

  return (
    <div className="group relative m-auto">
      <div
        className={cn(
          "flex justify-center rounded-xl border border-dashed  border-gray-300 p-3",
          isDraggedOver ? "" : ""
        )}
      >
        <div onDragEnter={dragEnter} onDragLeave={dragLeave} className="flex flex-col items-center p-2">
          <span className="text-center">{placeholder}</span>
          <span>ou</span>
          <span className="cursor-pointer rounded  text-center underline group-hover:shadow-xl">
            Cliquez pour choisir
          </span>
          <input
            id={id}
            accept={acceptFormat}
            type="file"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files[0]!) {
                fileUploaded(e);
              }
            }}
          />
        </div>
      </div>
      <div
        onDragEnter={dragEnter}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className="absolute inset-0 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          document?.getElementById(id)?.click();
        }}
      ></div>
    </div>
  );
};
