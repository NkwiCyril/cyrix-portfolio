import { CourseForm } from "@/components/admin/forms/course-form";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Course</h1>
        <p className="mt-1 text-sm text-gray-400">Create a new educational course</p>
      </div>

      <CourseForm />
    </div>
  );
}
