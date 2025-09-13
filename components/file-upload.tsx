"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        .
        <Button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.[0]?.ufsUrl)}
        onUploadError={(error: Error) => {
          console.error("Upload failed:", error);
        }}
      />
    </div>
  );
};
