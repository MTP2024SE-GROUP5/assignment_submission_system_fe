import {useQuery} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI} from "@/utils/api";

export const useGetAssignmentDetail = (AssignmentId: string) => {
  return useQuery({
    queryKey: ['get-assignment-details', AssignmentId],
    queryFn: async () => await AssignmentsApi.getDetail(AssignmentId),
  })
}