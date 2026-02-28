import {useQuery} from "@tanstack/react-query";
import {CourseAPI} from "@/utils/api";

export const useGetCourseDetails = (courseId: String) => {
  return useQuery({
    queryKey: ['get-course-details', courseId],
    queryFn: async () => await CourseAPI.getDetail(courseId),
  })
}