import React from "react";
import {useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export function WorkspaceOverview (){
  const { t } = useTranslation(['dashboard', 'common']);
  const { courseId } = useParams()
  // @ts-ignore
  const {data, isLoading} : { data: any, isLoading: boolean } = useGetCourseDetails(courseId);

  if (isLoading){
    return <div>{t('common:status.loading', {defaultValue: 'Loading'})}</div>
  }
  return(
      <div>
        <Card className="mt-[20px]">
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.code}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">{t('dashboard:workspace.overview.course_id', {defaultValue: 'Course ID'})}</p>
              <p className="font-medium">{data.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{t('dashboard:workspace.overview.status', {defaultValue: 'Status'})}</p>
              <Badge variant={data.archived ? "secondary" : "default"}>
                {data.archived ? t('dashboard:workspace.overview.archived', {defaultValue: 'Archived'}) : t('dashboard:workspace.overview.active', {defaultValue: 'Active'})}
              </Badge>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">{t('dashboard:workspace.overview.created_by', {defaultValue: 'Created By'})}</p>
              <p className="font-medium">{data.createdByUsername}</p>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}