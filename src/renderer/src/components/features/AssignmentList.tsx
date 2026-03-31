import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export function AssignmentList({assignments}:{assignments:any}) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('dashboard')
  return(
      <div>
        <Table className="mt-[20px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">{t('assignment_list.name', {defaultValue: 'Assignment Name'})}</TableHead>
              <TableHead>{t('assignment_list.due_date', {defaultValue: 'Due Date'})}</TableHead>
              <TableHead>{t('assignment_list.status', {defaultValue: 'Status'})}</TableHead>
              <TableHead className="text-right">{t('assignment_list.score', {defaultValue: 'Score'})}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment:any) => (
                <TableRow
                    key={assignment.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/workspaces/${courseId}/assignments/${assignment.id}`)}
                >
                  <TableCell className="font-medium">
                    {assignment.title}
                  </TableCell>
                  <TableCell>{assignment.dueDate || t('assignment_list.no_due_date', {defaultValue: "No due date"})}</TableCell>
                  <TableCell>
                    <Badge variant={assignment.status === "Completed" ? "default" : "secondary"}>
                      {assignment.status === "Completed" ? t('status.completed', {defaultValue: 'Completed'}) : assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {assignment.score !== undefined ? `${assignment.score}/100` : "-"}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}