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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox";
import {Link, useNavigate} from "react-router-dom";
import {useUserSignup} from "@/hooks/useUserSignup";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import { useTranslation } from 'react-i18next';

export function SignupForm({className, ...props}: React.ComponentProps<"form">) {

  const { t } = useTranslation('auth');
  type Role = {
    label: string
    value: string
  }
  const roles: Role[] = [
    {label: t('sign_up.role.student'), value:"STUDENT"},
    {label: t('sign_up.role.teacher'), value:"TEACHER"},
  ]

  const navigator = useNavigate();
  const {mutate, isPending} = useUserSignup();

  const {register, handleSubmit, formState: {isSubmitting}, control} = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      role: "",
      email: "",
    }
  })

  const onSubmit = async (formdata: any) => {
    console.log("Signup submit", formdata)
    mutate(formdata, {
      onSuccess: () => {
        toast.success(t('sign_up.notification.signup_success'));
        navigator("/login")
      },
      onError: (err: any) => {
        toast.error(t('sign_up.notification.signup_failed'))
      }
    })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">{t('sign_up.header.title')}</h1>
          </div>
          <Field>
            <FieldLabel htmlFor="name">{t('sign_up.full_name.label')}</FieldLabel>
            <Input id="name" type="text" placeholder={t('sign_up.full_name.placeholder')} required {...register("fullName")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">{t('sign_up.username.label')}</FieldLabel>
            <Input id="username" type="text" placeholder={t('sign_up.username.placeholder')} required {...register("username")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">{t('sign_up.email.label')}</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required {...register("email")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="role">{t('sign_up.role.label')}</FieldLabel>
            <Controller
                control={control}
                name="role"
                render={({ field }) => (
                    <Combobox
                        items={roles}
                        value={roles.find((r) => r.value === field.value)}
                        onValueChange={(selected: Role | null) => field.onChange(selected?.value)}
                        itemToStringValue={(role: Role) => role.label}
                    >
                      <ComboboxInput placeholder={t('sign_up.role.placeholder')} />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(role) => (
                              <ComboboxItem key={role.value} value={role}>
                                {role.label}
                              </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                )}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">{t('sign_up.password.label')}</FieldLabel>
            <Input id="password" type="password" required {...register("password")}/>
            <FieldDescription>
              {t('sign_up.password.length_require')}
            </FieldDescription>
          </Field>
          <Field>
            <Button type="submit">{t('sign_up.submit_btn.text')}</Button>
          </Field>
          <Field>
            <FieldDescription className="px-6 text-center">
              {t('sign_up.prompt_login.text')} <Link to="/login">{t('sign_up.prompt_login.link_holder')}</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
  )
}
