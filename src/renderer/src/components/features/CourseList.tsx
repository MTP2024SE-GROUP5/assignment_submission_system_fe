import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

interface Enrollment {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  userId: number;
  username: string;
  role: "STUDENT" | "TEACHER";
}

export function CourseList({ enrollments }: { enrollments: any }) {
  const { t } = useTranslation('dashboard')
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {enrollments.map((course: any) => (
            <Card key={course.enrollmentId} className="group hover:border-primary transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold leading-tight">
                  {course.courseName}
                </CardTitle>
                <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </CardHeader>

              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{course.username}</span>
                  <Badge
                      variant={course.role === "STUDENT" ? "secondary" : "default"}
                      className="ml-2 text-[10px] px-1.5 py-0"
                  >
                    {course.role}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/workspaces/${course.courseId}`}>
                    {t('workspace_list.enter_course', {defaultValue: 'Enter Course'})}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
        ))}
      </div>
  );
}