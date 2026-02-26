"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, X } from "lucide-react";
import type { Course, CourseModule } from "@/types/database";

interface CourseFormProps {
  course?: Course;
}

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: course?.title || "",
    slug: course?.slug || "",
    description: course?.description || "",
    price: course?.price || 0,
    enrollment_link: course?.enrollment_link || "",
    is_published: course?.is_published || false,
  });

  const [modules, setModules] = useState<CourseModule[]>(course?.modules || []);
  const [newModule, setNewModule] = useState({ title: "", videoUrl: "", notesUrl: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        modules,
      };

      const url = course ? `/api/courses/${course.id}` : "/api/courses";
      const method = course ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save course");
      }

      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addModule = () => {
    if (newModule.title.trim()) {
      setModules([...modules, { ...newModule }]);
      setNewModule({ title: "", videoUrl: "", notesUrl: "" });
    }
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Course Details</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">Enrollment Link</label>
            <input
              type="url"
              value={formData.enrollment_link}
              onChange={(e) => setFormData({ ...formData, enrollment_link: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-[#0a0a0a] text-accent focus:ring-accent"
            />
            <span className="text-sm font-medium text-gray-300">Published</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Course Modules</h2>
        
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              className="rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="Module title"
            />
            <input
              type="url"
              value={newModule.videoUrl}
              onChange={(e) => setNewModule({ ...newModule, videoUrl: e.target.value })}
              className="rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
              placeholder="Video URL"
            />
            <div className="flex gap-2">
              <input
                type="url"
                value={newModule.notesUrl}
                onChange={(e) => setNewModule({ ...newModule, notesUrl: e.target.value })}
                className="flex-1 rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-2 text-white focus:border-accent focus:outline-none"
                placeholder="Notes URL"
              />
              <button
                type="button"
                onClick={addModule}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {modules.length > 0 && (
            <div className="space-y-2">
              {modules.map((module, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded bg-gray-800 p-3">
                  <div className="flex-1">
                    <div className="font-medium text-white">{module.title}</div>
                    <div className="mt-1 flex gap-4 text-xs text-gray-400">
                      {module.videoUrl && <span>📹 Video</span>}
                      {module.notesUrl && <span>📝 Notes</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(idx)}
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
              {course ? "Update Course" : "Create Course"}
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
