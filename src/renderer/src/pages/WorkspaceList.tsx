import React from "react";
import {CourseList} from "@/components/features/CourseList";
import {useSidebarData} from "@/hooks/useSidebarData";
import {useAuth} from "@/hooks/useAuth";
import {useUserStore} from "@/store";
import {useMyCourses} from "@/hooks/useMyCourses";
import {useSearchParams} from "react-router-dom";
import {CreatedCourseList} from "@/components/features/CreatedCourseList";
import {Button} from "@/components/ui/button";
import {useGetCoursesCreated} from "@/hooks/useGetCoursesCreated";

export function WorkspaceList() {

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("type") || "enrolled";

  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)
  const{ data: courses, isLoading : coursesLoading} = useMyCourses(user?.id);
  const{ data: coursesCreated, isLoading : coursesCreatedLoading} = useGetCoursesCreated(user?.id);

  return (
      <div className="container py-2">
        {mode === "created" ? (
            <div className=" flex items-center justify-end px-20">
              <Button>Create New Course</Button>
            </div>
        ) : (
            ""
        )}

        {mode === "created" ? (
            <CreatedCourseList courses={coursesCreated} />
        ) : (
            <CourseList enrollments={courses} />
        )}
      </div>
  );
}