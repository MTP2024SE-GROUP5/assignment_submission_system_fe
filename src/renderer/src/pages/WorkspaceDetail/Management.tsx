import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useGetCourseDetails } from "@/hooks/useGetCourseDetails";
import { useModifyCourse } from "@/hooks/useModifyCourse";
import { useArchiveCourse } from "@/hooks/useArchiveCourse";
import { useUnarchiveCourse } from "@/hooks/useUnarchiveCourse";
import { useGetAllEnrolled } from "@/hooks/useGetAllEnrolled";
import { useEnrollUser } from "@/hooks/useEnrollUser";
import { useUnenrollUser } from "@/hooks/useUnenrollUser";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, UserPlus, Save, Archive, ArchiveRestore } from "lucide-react";
import { useTranslation } from "react-i18next";

export function CourseManagementPage() {
  const { courseId } = useParams();
  const { t } = useTranslation(['dashboard', 'common']);

  // Queries
  // @ts-ignore
  const { data: course, refetch: refetchCourse, isLoading: isCourseLoading }:{data:any, refetch:any, isLoading:any} = useGetCourseDetails(courseId);
  const { data: enrolledStudents, refetch: refetchStudents }:{data:any, refetch:any} = useGetAllEnrolled(courseId as string);

  // Mutations
  const { mutate: modifyCourse, isPending: isModifying } = useModifyCourse();
  const { mutate: archiveCourse, isPending: isArchiving } = useArchiveCourse();
  const { mutate: unarchiveCourse, isPending: isUnarchiving } = useUnarchiveCourse();
  const { mutate: enrollUser, isPending: isEnrolling } = useEnrollUser();
  const { mutate: unenrollUser } = useUnenrollUser();

  // Local State
  const [enrollUserId, setEnrollUserId] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // Reset form when course data loads
  useEffect(() => {
    if (course) {
      reset({ name: course.name, code: course.code });
    }
  }, [course, reset]);

  // 1. Handle Course Modification
  const handleUpdateCourse = (data: any) => {
    modifyCourse(
        { id: courseId as string, formData: data },
        {
          onSuccess: () => {
            toast.success(t('dashboard:workspace.management.toast.update_success', {defaultValue: 'Course details updated successfully.'}));
            refetchCourse();
          },
          onError: (err: any) => toast.error(err.response?.data?.message || t('dashboard:workspace.management.toast.update_failed', {defaultValue: 'Failed to update course.'})),
        }
    );
  };

  // 2. Handle Archive/Unarchive
  const toggleArchiveStatus = () => {
    if (course?.archived) {
      unarchiveCourse(courseId as string, {
        onSuccess: () => {
          toast.success(t('dashboard:workspace.management.toast.unarchive_success', {defaultValue: 'Course unarchived successfully.'}));
          refetchCourse();
        },
        onError: (err: any) => toast.error(err.response?.data?.message || t('dashboard:workspace.management.toast.unarchive_failed', {defaultValue: 'Failed to unarchive course.'})),
      });
    } else {
      if (window.confirm(t('dashboard:workspace.management.confirm_archive', {defaultValue: 'Are you sure you want to archive this course?'}))) {
        archiveCourse(courseId as string, {
          onSuccess: () => {
            toast.success(t('dashboard:workspace.management.toast.archive_success', {defaultValue: 'Course archived successfully.'}));
            refetchCourse();
          },
          onError: (err: any) => toast.error(err.response?.data?.message || t('dashboard:workspace.management.toast.archive_failed', {defaultValue: 'Failed to archive course.'})),
        });
      }
    }
  };

  // 3. Handle Enrollment
  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollUserId.trim()) return;

    enrollUser(
        { courseId: courseId as string, userId: enrollUserId },
        {
          onSuccess: () => {
            toast.success(t('dashboard:workspace.management.toast.enroll_success', {defaultValue: 'User enrolled successfully.'}));
            setEnrollUserId("");
            refetchStudents();
          },
          onError: (err: any) => toast.error(err.response?.data?.message || t('dashboard:workspace.management.toast.enroll_failed', {defaultValue: 'Failed to enroll user.'})),
        }
    );
  };

  // 4. Handle Unenrollment
  const handleUnenroll = (userId: string) => {
    if (window.confirm(t('dashboard:workspace.management.confirm_remove_student', {defaultValue: 'Remove this student from the course?'}))) {
      unenrollUser(
          { courseId: courseId as string, userId },
          {
            onSuccess: () => {
              toast.success(t('dashboard:workspace.management.toast.remove_success', {defaultValue: 'Student removed successfully.'}));
              refetchStudents();
            },
            onError: (err: any) => toast.error(err.response?.data?.message || t('dashboard:workspace.management.toast.remove_failed', {defaultValue: 'Failed to remove student.'})),
          }
      );
    }
  };

  if (isCourseLoading) return <div className="p-4">{t('dashboard:workspace.management.loading', {defaultValue: 'Loading management dashboard...'})}</div>;

  return (
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('dashboard:tabs.management', {defaultValue: 'Management'})}</h2>
          <Badge variant={course?.archived ? "destructive" : "default"} className="text-sm">
            {course?.archived ? t('dashboard:workspace.overview.archived', {defaultValue: 'Archived'}) : t('dashboard:workspace.overview.active', {defaultValue: 'Active'})}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Section 1: Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard:workspace.management.course_info', {defaultValue: 'Course Information'})}</CardTitle>
              <CardDescription>{t('dashboard:workspace.management.course_info_desc', {defaultValue: 'Update the name and code of the course.'})}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleUpdateCourse)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('dashboard:workspace.management.course_name', {defaultValue: 'Course Name'})}</Label>
                  <Input id="name" {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">{t('dashboard:workspace.management.course_code', {defaultValue: 'Course Code'})}</Label>
                  <Input id="code" {...register("code", { required: true })} />
                </div>
                <Button type="submit" disabled={isModifying}>
                  <Save className="mr-2 h-4 w-4" />
                  {isModifying ? t('common:actions.saving', {defaultValue: 'Saving...'}) : t('common:actions.save_changes', {defaultValue: 'Save Changes'})}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Section 2: Danger Zone (Archive) */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">{t('dashboard:workspace.management.danger_zone', {defaultValue: 'Danger Zone'})}</CardTitle>
              <CardDescription>{t('dashboard:workspace.management.danger_zone_desc', {defaultValue: 'Change the visibility and active status of this course.'})}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t('dashboard:workspace.management.archive_warning', {defaultValue: 'Archiving a course hides it from active lists but preserves data. Unarchiving restores full access.'})}
                </p>
                <Button
                    variant={course?.archived ? "default" : "destructive"}
                    onClick={toggleArchiveStatus}
                    disabled={isArchiving || isUnarchiving}
                    className="w-fit"
                >
                  {course?.archived ? <ArchiveRestore className="mr-2 h-4 w-4" /> : <Archive className="mr-2 h-4 w-4" />}
                  {course?.archived ? t('dashboard:workspace.management.unarchive_course', {defaultValue: 'Unarchive Course'}) : t('dashboard:workspace.management.archive_course', {defaultValue: 'Archive Course'})}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Student Management */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard:workspace.management.student_management', {defaultValue: 'Student Management'})}</CardTitle>
            <CardDescription>{t('dashboard:workspace.management.student_management_desc', {defaultValue: 'Manage enrolled students manually.'})}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enroll Form */}
            <form onSubmit={handleEnroll} className="flex gap-4 items-end">
              <div className="space-y-2 flex-grow max-w-sm">
                <Label htmlFor="userId">{t('dashboard:workspace.management.enroll_via_id', {defaultValue: 'Enroll via User ID'})}</Label>
                <Input
                    id="userId"
                    placeholder={t('dashboard:workspace.management.enter_user_id', {defaultValue: 'Enter User ID...'})}
                    value={enrollUserId}
                    onChange={(e) => setEnrollUserId(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isEnrolling || !enrollUserId}>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('dashboard:workspace.management.enroll', {defaultValue: 'Enroll'})}
              </Button>
            </form>

            {/* Enrolled Students Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dashboard:workspace.management.table.user_id', {defaultValue: 'User ID'})}</TableHead>
                    <TableHead>{t('dashboard:workspace.management.table.username', {defaultValue: 'Username'})}</TableHead>
                    <TableHead>{t('dashboard:workspace.management.table.role', {defaultValue: 'Role'})}</TableHead>
                    <TableHead className="text-right">{t('dashboard:workspace.management.table.actions', {defaultValue: 'Actions'})}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(!enrolledStudents || enrolledStudents.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                          {t('dashboard:workspace.management.table.no_students', {defaultValue: 'No students enrolled yet.'})}
                        </TableCell>
                      </TableRow>
                  )}
                  {enrolledStudents?.map((student: any) => (
                      <TableRow key={student.enrollmentId}>
                        <TableCell className="font-mono">{student.userId}</TableCell>
                        <TableCell>{student.username}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {student.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleUnenroll(student.userId.toString())}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('dashboard:workspace.management.table.remove', {defaultValue: 'Remove'})}
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}