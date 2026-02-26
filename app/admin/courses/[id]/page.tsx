import { adminClient } from "@/utils/supabase/admin";
import { CourseForm } from "@/components/admin/forms/course-form";
import { notFound } from "next/navigation";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: course, error } = await adminClient
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Course</h1>
        <p className="mt-1 text-sm text-gray-400">Update course: {course.title}</p>
      </div>

      <CourseForm course={course} />
    </div>
  );
}
