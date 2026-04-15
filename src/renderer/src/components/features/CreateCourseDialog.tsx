import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";

export function CreateCourseDialog({ onCreate }: { onCreate: (data: any) => Promise<void> }) {
  const { t } = useTranslation("dashboard");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    await onCreate(data);
    setOpen(false);
    reset();
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">{t("create_course.button_new")}</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{t("create_course.title")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("create_course.labels.name")}</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">{t("create_course.labels.code")}</Label>
                <Input id="code" {...register("code", { required: true })} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("create_course.buttons.saving") : t("create_course.buttons.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}