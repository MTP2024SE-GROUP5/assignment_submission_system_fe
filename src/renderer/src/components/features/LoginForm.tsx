import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React from "react"
import {useForm} from "react-hook-form";
import {useNavigate, useRoutes} from "react-router-dom";
import {useUserLogin} from "@/hooks/useUserLogin";
import {toast} from "sonner";

export function LoginForm({className, ...props}: React.ComponentProps<"form">) {

  const navigator = useNavigate();
  const {mutate, isPending} = useUserLogin();

  const {register, handleSubmit, formState: {isSubmitting}} = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const onSubmit = async (formData:any) =>{
    console.log("Login submit",formData)
    mutate(formData, {
      onSuccess: ()=> {
        toast.success("Login success, redirecting");
        navigator("/");
      },
      onError:(err:any) => {
        toast.error(err.message || "Login failed");
      }
    })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your username below to login to your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Username</FieldLabel>
            <Input id="username" type="text" required {...register("username")} />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required {...register("password")}/>
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
  )
}
