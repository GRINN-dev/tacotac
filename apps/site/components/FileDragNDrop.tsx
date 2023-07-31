import { ChangeEvent, DragEvent, FC, useState } from "react";
import { max } from "date-fns";





export interface FileDragNDropProps {
  title: string | null | undefined;
  id: string;
  acceptFormat: string;
  placeholder: string;
  onFileUpload: (files: File[]) => void;
  maxSize?: number;
}

//random int between 1 and 1000000

export const FileDragNDrop: FC<FileDragNDropProps> = ({
  title,
  onFileUpload,
  id,
  acceptFormat,
  placeholder,
  maxSize,
}) => {
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
    const files = e.dataTransfer.files;
    loadFiles(Array.from(files));
    console.log(files);
  };

  const loadFiles = async (files: File[]) => {
    setLoading(true);
    onFileUpload(files);
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
    if (!e.target.files || !e.target.files[0].type.includes("image")) {
      alert("Le format du fichier n'est pas accepté");
      return;
    }
    const files = e.target.files;
    loadFiles(Array.from(files!));
  };

  return (
    <div className="group relative">
      <div
        className={
          "flex justify-center px-3 py-3 text-sm  border border-dashed rounded-xl text-primary-500 border-gray-300 " +
          (isDraggedOver ? "border-primary-500 bg-gradient-to-tr from-accent-50 to-accent-900" : "")
        }
      >
        <div onDragEnter={dragEnter} onDragLeave={dragLeave} className="m-2 flex flex-col items-center p-4">
          <span className="py-1 px-1.5 text-center text-base">{placeholder}</span>
          <span>ou</span>
          <label htmlFor={id} className="">
            <span className="group-hover:text-primary-500 group-hover:bg-accent-500 cursor-pointer rounded py-1 px-1.5 text-center text-base underline group-hover:shadow-xl">
              Cliquez pour choisir
            </span>
            <input
              id={id}
              accept={acceptFormat}
              name={id}
              type="file"
              className="sr-only file:m-4 file:px-8 file:py-1 file:text-sm "
              onChange={(e) => fileUploaded(e)}
            />
          </label>
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