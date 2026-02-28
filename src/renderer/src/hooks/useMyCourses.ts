import {useQuery} from "@tanstack/react-query";
import {CourseAPI} from "@/utils/api";

export const useMyCourses = (userId: number) => {
  return useQuery({
    queryKey: ['my-courses', userId],
    queryFn: async () => {
      const response = await CourseAPI.listMyEnrolled(userId);

      console.log('Api response: ', response);
      return response ?? [];
    },
    // select: (data: any[]) => data.map(e => e.course),
  })
}