import React from "react";
import { FileUpload } from "./ui/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log("Files uploaded:", newFiles);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload type="image" />
    </div>
  );
}
