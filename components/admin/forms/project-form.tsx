"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, X } from "lucide-react";
import type { Project } from "@/types/database";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    long_description: project?.long_description || "",
    category: project?.category || "",
    year: project?.year || new Date().getFullYear(),
    client: project?.client || "",
    live_url: project?.live_url || "",
    repo_url: project?.repo_url || "",
    featured_image_url: project?.featured_image_url || "",
    bg_color: project?.bg_color || "bg-gray-900",
  });

  const [images, setImages] = useState<string[]>(project?.images || []);
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const [features, setFeatures] = useState<string[]>(project?.features || []);

  const [newImage, setNewImage] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        images,
        technologies,
        features,
      };

      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addItem = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>, clearInput: () => void) => {
    if (value.trim()) {
      setter(prev => [...prev, value.trim()]);
      clearInput();
    }
  };

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Basic Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Client
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Background Color
            </label>
            <input
              type="text"
              value={formData.bg_color}
              onChange={(e) => setFormData({ ...formData, bg_color: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="bg-gray-900"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Short Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Long Description
          </label>
          <textarea
            value={formData.long_description}
            onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
            rows={6}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Links & Media</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Live URL
            </label>
            <input
              type="url"
              value={formData.live_url}
              onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Repository URL
            </label>
            <input
              type="url"
              value={formData.repo_url}
              onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Featured Image URL
          </label>
          <input
            type="url"
            value={formData.featured_image_url}
            onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Additional Images
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="Image URL"
            />
            <button
              type="button"
              onClick={() => addItem(newImage, setImages, () => setNewImage(""))}
              className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
            >
              <Plus size={20} />
            </button>
          </div>
          {images.length > 0 && (
            <div className="mt-3 space-y-2">
              {images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded bg-gray-800 px-3 py-2">
                  <span className="flex-1 truncate text-sm text-gray-300">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(idx, setImages)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Technologies</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="e.g., React, Node.js"
          />
          <button
            type="button"
            onClick={() => addItem(newTech, setTechnologies, () => setNewTech(""))}
            className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            <Plus size={20} />
          </button>
        </div>
        {technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1">
                <span className="text-sm text-gray-300">{tech}</span>
                <button
                  type="button"
                  onClick={() => removeItem(idx, setTechnologies)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Features</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            placeholder="e.g., Responsive design"
          />
          <button
            type="button"
            onClick={() => addItem(newFeature, setFeatures, () => setNewFeature(""))}
            className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            <Plus size={20} />
          </button>
        </div>
        {features.length > 0 && (
          <div className="mt-3 space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded bg-gray-800 px-3 py-2">
                <span className="flex-1 text-sm text-gray-300">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeItem(idx, setFeatures)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/20 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              {project ? "Update Project" : "Create Project"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
