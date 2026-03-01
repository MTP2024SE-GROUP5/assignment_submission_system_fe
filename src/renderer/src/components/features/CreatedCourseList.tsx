import React from "react";
import {Book} from "lucide-react";
import {CreatedCourseCard} from "@/components/features/CreatedCourseCard";

export function CreatedCourseList({ courses }: { courses: any }) {
  if (!courses || courses.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
          <Book className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No courses created yet</h3>
          <p className="text-sm text-muted-foreground">Get started by creating your first course.</p>
        </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {courses.map((course: any) => (
            <CreatedCourseCard key={course.id} course={course} />
        ))}
      </div>
  );
}