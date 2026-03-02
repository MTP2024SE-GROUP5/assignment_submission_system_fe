import {useMutation} from "@tanstack/react-query";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useStudentGetSubmission = () => {
  return useMutation({
    mutationFn: async (assignmentId: string) => await SubmissionApi.studentGetSubmission(assignmentId),
    onSuccess: (res:any) => {
      console.log("Get submission success")
    },
    onError: (error) => {
      console.error("Get submission failed", error)
    }
  })
}