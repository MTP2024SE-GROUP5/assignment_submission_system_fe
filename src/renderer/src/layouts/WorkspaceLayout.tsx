import React, {useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {useTitle} from "../../context/TitleContext";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";

export function WorkspaceLayout() {
  const { id } = useParams()
  const {data, isLoading} : { data: any, isLoading: boolean } = useGetCourseDetails(Number(id));
  const{setTitle} = useTitle();

  useEffect(()=>{
    if (!isLoading && data && data.length > 0) {
      console.log(data)
      setTitle(data[0].courseName);
    }
  }, [data, isLoading, setTitle]);

  return(
      <div className="w-full">
        <div className="w-full px-[20px]">
          <ButtonGroup>
            <Button variant="outline">Overview</Button>
            <Button variant="outline">Assignments</Button>
          </ButtonGroup>
          <Outlet />
        </div>
      </div>
  )
}