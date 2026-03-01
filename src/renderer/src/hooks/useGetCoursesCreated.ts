import {useQuery} from "@tanstack/react-query";
import {CourseAPI} from "@/utils/api";

export const useGetCoursesCreated = (teacherId: string) => {
  return useQuery({
    queryKey: ['get-course-created', teacherId],
    queryFn: async () => await CourseAPI.listMyCreated(teacherId),
  })
}