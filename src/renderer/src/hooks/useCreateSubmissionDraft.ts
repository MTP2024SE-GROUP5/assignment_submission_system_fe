import {useMutation} from "@tanstack/react-query";
import {CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useCreateSubmissionDraft = () => {
  return useMutation({
    mutationFn: async ({ assignmentId, discription }: { assignmentId: string; discription: any }) => await SubmissionApi.createDraft(assignmentId,discription),
    onSuccess: (res:any) => {
      console.log("Create new submission draft success")
    },
    onError: (error) => {
      console.error("Create new submission draft failed", error)
    }
  })
}