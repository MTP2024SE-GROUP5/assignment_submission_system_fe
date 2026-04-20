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
import {Link, useNavigate, useRoutes} from "react-router-dom";
import {useUserLogin} from "@/hooks/useUserLogin";
import {toast} from "sonner";
import { useTranslation } from 'react-i18next';


export function LoginForm({className, ...props}: React.ComponentProps<"form">) {

  const { t } = useTranslation('auth');
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
        toast.success(t('login.form.notification.login_success'));
        navigator("/");
      },
      onError:(err:any) => {
        toast.error(t('login.form.notification.login_failed'));
      }
    })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">{t('login.header.title')}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {t('login.header.subtitle')}
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">{t('login.form.username.label')}</FieldLabel>
            <Input id="username" type="text" required {...register("username")} />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">{t('login.form.password.label')}</FieldLabel>
              <button
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    (window as any).electronAPI.openInBrowser("https://www.youtube.com/watch?v=F0Gkr4MBEO0");
                  }}
              >
                {t('login.form.password.forget_password')}
              </button>
            </div>
            <Input id="password" type="password" required {...register("password")}/>
          </Field>
          <Field>
            <Button type="submit">{t('login.form.submit_btn.text')}</Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              {t('login.form.prompt_signup.text')}{" "}
              <Link to="/login/signup" className="underline underline-offset-4">
                {t('login.form.prompt_signup.link_holder')}
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
  )
}
