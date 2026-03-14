"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  bucket?: string;
  label?: string;
  accept?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  bucket = "uploads",
  label = "Upload Image",
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
      />

      {value ? (
        <div className="relative mt-2 inline-block">
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-700 bg-[#0a0a0a]">
            <Image
              src={value}
              alt="Uploaded"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-600 bg-[#0a0a0a] px-4 py-3 text-sm text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} />
              {label}
            </>
          )}
        </button>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  bucket?: string;
  label?: string;
}

export function MultiImageUpload({
  values,
  onChange,
  folder = "general",
  bucket = "uploads",
  label = "Add Image",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange([...values, data.url]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-3">
          {values.map((url, idx) => (
            <div key={idx} className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-700 bg-[#0a0a0a]">
                <Image
                  src={url}
                  alt={`Image ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-600 bg-[#0a0a0a] px-4 py-3 text-sm text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={16} />
            {label}
          </>
        )}
      </button>

      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
