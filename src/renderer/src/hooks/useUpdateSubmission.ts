import {useMutation} from "@tanstack/react-query";
import {CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useUpdateSubmission = () => {
  return useMutation({
    mutationFn: async ({ submissionId, discription }: { submissionId: string; discription: any }) => await SubmissionApi.updateDescription(submissionId,discription),
    onSuccess: (res:any) => {
      console.log("Update submission draft success")
    },
    onError: (error) => {
      console.error("Update submission draft failed", error)
    }
  })
}