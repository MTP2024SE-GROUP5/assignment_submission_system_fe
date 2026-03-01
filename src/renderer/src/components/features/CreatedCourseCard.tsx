import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

interface CreatedCourse {
  id: number;
  name: string;
  code: string;
  archived: boolean;
  createdByUsername: string;
}

export function CreatedCourseCard({ course }: { course: CreatedCourse }) {
  return (
      <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold leading-none">
              {course.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-mono">{course.code}</p>
          </div>
          <Badge variant={(course.archived ? "secondary" : "default") as any}>
            {course.archived ? "Archived" : "Active"}
          </Badge>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-4 w-4" />
            <span>Created by {course.createdByUsername}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button asChild className="w-full group" variant="outline">
            <Link to={`/workspaces/${course.id}`}>
              Manage Course
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
  );
}