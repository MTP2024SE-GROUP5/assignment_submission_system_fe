import {useMutation} from "@tanstack/react-query";
import {UserApi} from "@/utils/api";

export const useUserLogin = () => {
  return useMutation({
    mutationFn: async (formData: any) => await UserApi.login(formData),
    onSuccess: (res:any) => {
      if(res?.token){
        localStorage.setItem("token", res.token);
        localStorage.setItem("user",JSON.stringify(res.user));
      }
  },
    onError: (error) => {
      console.error("Login failed", error)
    }
  })
}