import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateAssignment } from "@/hooks/useCreateAssignment"; // 引入你的 Hook
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


export function CreateAssignmentDialog({ courseId, refetch }: { courseId: string | number, refetch: () => void }) {
  const { t } = useTranslation("dashboard");
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateAssignment(); // 使用你封装的 Hook

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  // 核心：匹配后端 @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
  const formatToBackendDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [date, time] = dateStr.split('T');
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year} ${time}:00`;
  };

  const onSubmit = async (data: any) => {
    const payload = {
      courseId: Number(courseId),
      title: data.title,
      description: data.description,
      dueDate: formatToBackendDate(data.dueDate),
      allowedFileTypes: data.allowedFileTypes,
      maxFileSizeMB: Number(data.maxFileSizeMB) || 10.0
    };

    try {
      await mutateAsync(payload); // 执行提交
      toast.success(t("create_assignment.toast.success"));
      setOpen(false);
      reset();
      refetch(); // 刷新列表数据
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("create_assignment.toast.failed"));
    }
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t("create_assignment.button_new")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{t("create_assignment.title")}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>{t("create_assignment.labels.title")}</Label>
                <Input {...register("title", { required: true })} />
              </div>

              <div className="grid gap-2">
                <Label>{t("create_assignment.labels.description")}</Label>
                <Textarea {...register("description")} />
              </div>

              <div className="grid gap-2">
                <Label>{t("create_assignment.labels.due_date")}</Label>
                <Input type="datetime-local" {...register("dueDate", { required: true })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>{t("create_assignment.labels.file_types")}</Label>
                  <Input placeholder={t("create_assignment.placeholders.file_types")} {...register("allowedFileTypes")} />
                </div>
                <div className="grid gap-2">
                  <Label>{t("create_assignment.labels.max_size")}</Label>
                  <Input type="number" step="0.1" {...register("maxFileSizeMB")} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("create_assignment.buttons.creating") : t("create_assignment.buttons.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}