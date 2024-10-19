"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { BiSolidBookContent } from "react-icons/bi";
import { RiFileTextLine } from "react-icons/ri";
import Editor from "@/components/Editor";

interface ChapterTextFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  textContent: z.string().min(1),
});

const ChapterTextForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTextFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textContent: initialData?.textContent || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-accent/50 dark:bg-accent/20 rounded-lg p-4">
      <div className="font-medium text-lg flex items-center justify-between">
        <span className="flex items-center justify-center gap-2 text-xl">
          Chapter Content
        </span>
        <Button variant={"ghost"} onClick={toggleEdit} disabled={isSubmitting}>
          {isEditing && (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.textContent && (
            <>
              <BiSolidBookContent className="h-4 w-4 mr-2" />
              Add Content
            </>
          )}
          {!isEditing && initialData.textContent && (
            <>
              <RiFileTextLine className="h-4 w-4 mr-2" />
              Edit Content
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-3"
          >
            <FormField
              control={form.control}
              name="textContent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="default"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isEditing && initialData.textContent && (
        <div className="mt-2">
          <p>{initialData.textContent}</p>
        </div>
      )}
    </div>
  );
};

export default ChapterTextForm;
