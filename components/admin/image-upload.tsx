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
  label = "Add Images",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadOne = async (file: File): Promise<string> => {
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
      throw new Error(data.error || `Failed to upload ${file.name}`);
    }
    return data.url as string;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setError("");
    setUploading(true);
    setProgress({ done: 0, total: files.length });

    const results = await Promise.allSettled(
      files.map(async (file) => {
        const url = await uploadOne(file);
        setProgress((p) => ({ ...p, done: p.done + 1 }));
        return url;
      })
    );

    const uploaded: string[] = [];
    const failures: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        uploaded.push(r.value);
      } else {
        const msg = r.reason instanceof Error ? r.reason.message : "Upload failed";
        failures.push(`${files[i].name}: ${msg}`);
      }
    });

    if (uploaded.length > 0) {
      onChange([...values, ...uploaded]);
    }
    if (failures.length > 0) {
      setError(
        failures.length === files.length
          ? failures.join(" • ")
          : `${failures.length} of ${files.length} failed. ${failures.join(" • ")}`
      );
    }

    setUploading(false);
    setProgress({ done: 0, total: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        multiple
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
            Uploading {progress.done} of {progress.total}…
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
