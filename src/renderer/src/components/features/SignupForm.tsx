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
import {useNavigate} from "react-router-dom";
import {useUserSignup} from "@/hooks/useUserSignup";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

export function SignupForm({className, ...props}: React.ComponentProps<"form">) {

  type Role = {
    label: string
    value: string
  }
  const roles: Role[] = [
    {label: "Student", value:"STUDENT"},
    {label: "Teacher", value:"TEACHER"},
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
        toast.success("Signup success");
        navigator("/login")
      },
      onError: (err: any) => {
        toast.error(err.message || "Signup failed")
      }
    })
  }

  // @ts-ignore
  return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required {...register("fullName")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Username</FieldLabel>
            <Input id="username" type="text" placeholder="JohnDoe123" required {...register("username")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required {...register("email")}/>
          </Field>
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Controller
                control={control}
                name="role"
                render={({ field }) => (
                    <Combobox
                        items={roles}
                        value={roles.find((r) => r.value === field.value)}
                        onValueChange={(selected: Role) => field.onChange(selected?.value)}
                        itemToStringValue={(role: Role) => role.label}
                    >
                      <ComboboxInput placeholder="Select a role" />
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
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required {...register("password")}/>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>
          <Field>
            <Button type="submit">Create Account</Button>
          </Field>
          <Field>
            <FieldDescription className="px-6 text-center">
              Already have an account? <a href="/#/login">Sign in</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
  )
}
