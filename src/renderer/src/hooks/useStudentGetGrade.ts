import {useMutation} from "@tanstack/react-query";
import {SubmissionApi} from "@/utils/api/modules/submission";
import {GradeApi} from "@/utils/api/modules/grade";

export const useStudentGetGrade = () => {
  return useMutation({
    mutationFn: async (submissionId: string) => await GradeApi.studentGetGrade(submissionId),
    onSuccess: (res:any) => {
      console.log("Get grade success")
    },
    onError: (error) => {
      console.error("Get grade failed", error)
    }
  })
}