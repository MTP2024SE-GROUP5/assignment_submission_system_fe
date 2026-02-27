import React, {useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {useTitle} from "../../context/TitleContext";

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
      <div>
        <Outlet />
      </div>
  )
}