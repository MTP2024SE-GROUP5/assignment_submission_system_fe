import React, {useEffect} from "react";
import {CourseList} from "@/components/features/CourseList";
import {useSidebarData} from "@/hooks/useSidebarData";
import {useAuth} from "@/hooks/useAuth";
import {useTitleStore, useUserStore} from "@/store";
import {useMyCourses} from "@/hooks/useMyCourses";
import {useSearchParams} from "react-router-dom";
import {CreatedCourseList} from "@/components/features/CreatedCourseList";
import {Button} from "@/components/ui/button";
import {useGetCoursesCreated} from "@/hooks/useGetCoursesCreated";
import {CreateCourseDialog} from "@/components/features/CreateCourseDialog";
import {useCreateCourse} from "@/hooks/useCreateCourse";
import {toast} from "sonner";
import { useTranslation } from "react-i18next";

export function WorkspaceList() {

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("type") || "enrolled";

  const {user} = useAuth();

  const setTitle = useTitleStore((state) => state.setTitle);
  const { t } = useTranslation(['common', 'dashboard']);
  useEffect(() => {
    setTitle(t('common:nav.workspaces', {defaultValue: 'Workspaces'}));
  }, [setTitle, t]);

  const userDetail = useUserStore(state => state.user)
  const{ data: courses, isLoading : coursesLoading} = useMyCourses(user?.id);
  const{ data: coursesCreated, isLoading : coursesCreatedLoading} = useGetCoursesCreated(user?.id);
  const {mutate, isPending} = useCreateCourse ();

  const handleCreate = async (formdata: any) => {
    console.log("Signup submit", formdata)
    mutate(formdata, {
      onSuccess: () => {
        toast.success(t('dashboard:toast.create_course_success', {defaultValue: 'Success create new course'}));
      },
      onError: (err: any) => {
        toast.error(err.message || t('dashboard:toast.create_course_failed', {defaultValue: 'Create new course failed'}));
      }
    })
  };

  return (
      <div className="container py-2">
        {mode === "created" ? (
            <div className=" flex items-center justify-end px-4">
              <CreateCourseDialog onCreate={handleCreate} />
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