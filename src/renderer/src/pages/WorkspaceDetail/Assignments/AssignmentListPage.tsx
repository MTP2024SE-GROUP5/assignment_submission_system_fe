import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {useGetAssignmentsInCourse} from "@/hooks/useGetAssignmentsInCourse";
import {Badge} from "@/components/ui/badge";
import {useUserStore} from "@/store";
import {AssignmentList} from "@/components/features/AssignmentList";
import {TeacherAssignmentList} from "@/components/features/TeacherAssignmentList";
import {CreateAssignmentDialog} from "@/components/features/CreateAssignmentDialog";
import { useTranslation } from "react-i18next";

export function AssignmentListPage() {

  const { courseId } = useParams()
  const { t } = useTranslation('common');
  // @ts-ignore
  const {data:assignments, isLoading, refetch} = useGetAssignmentsInCourse(courseId);

  const userDetail = useUserStore(state => state.user)

  if (isLoading && !assignments) {
    return <div className="p-10 text-center">{t('status.initial_loading', {defaultValue: 'Initial Loading...'})}</div>;
  }

  // @ts-ignore
  if(userDetail.role === "TEACHER"){
    return (
        <div>
          <div className="flex justify-end">
            <CreateAssignmentDialog courseId={courseId!} refetch={refetch} />
          </div>
          <TeacherAssignmentList assignments={assignments} refetch={refetch} isLoading={isLoading} />
        </div>
        )}

  return(
      <AssignmentList assignments={assignments}/>
  )
}