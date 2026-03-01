import {useMutation} from "@tanstack/react-query";
import {UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useUserSignup = () => {
  return useMutation({
    mutationFn: async (formData: any) => await UserApi.register(formData),
    onSuccess: (res:any) => {
      console.log("Register success")
  },
    onError: (error) => {
      console.error("Login failed", error)
    }
  })
}