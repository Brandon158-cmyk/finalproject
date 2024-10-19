"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { BiSolidVideoPlus } from "react-icons/bi";
import { RiVideoUploadLine } from "react-icons/ri";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, "Video is required"),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const ReactPlayer = useMemo(
    () => dynamic(() => import("react-player"), { ssr: false }),
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
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

  const handleUpload = (result: any) => {
    const videoUrl = result.info.secure_url;
    form.setValue("videoUrl", videoUrl);
    onSubmit({ videoUrl });
  };

  return (
    <div className="border bg-accent/50 dark:bg-accent/20 rounded-lg p-4">
      <div className="font-medium text-lg flex items-center justify-between">
        <span className="flex items-center justify-center gap-2 text-xl">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          Chapter Video
        </span>
        <Button variant={"ghost"} onClick={toggleEdit} disabled={isSubmitting}>
          {isEditing && (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <BiSolidVideoPlus className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <RiVideoUploadLine className="h-4 w-4 mr-2" />
              Change Video
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <div className="mt-4">
          <CldUploadWidget
            uploadPreset="ml_default"
            onUpload={handleUpload}
          >
            {({ open }) => (
              <Button onClick={() => open()} type="button">
                Upload Video
              </Button>
            )}
          </CldUploadWidget>
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-2">
          <ReactPlayer
            url={initialData.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>
      )}
      {!isEditing && !initialData.videoUrl && (
        <div className="text-sm text-muted-foreground mt-2">
          No video uploaded
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
