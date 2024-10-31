"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GroupPrivacy } from "@/lib/types/group";
import Combobox from "@/components/ui/combox";
import TagInput from "./TagInput";

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    privacy: z.enum(["public", "private", "course-members"] as const),
    courseId: z.string().optional(),
    categoryId: z.string().optional(),
    maxMembers: z.number().min(2).max(100),
    levelRequirement: z.number().min(0),
    tags: z.array(z.string()),
  })
  //   TODO: Fix this after the group resources feature is implemented
  .refine((data) => data.levelRequirement <= userLevel, {
    message: "Level requirement cannot be higher than your current level",
    path: ["levelRequirement"],
  });

interface CreateGroupFormProps {
  userLevel: number;
  onSuccess: () => void;
  courses: {
    id: string;
    title: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
}

const CreateGroupForm = ({
  userLevel,
  onSuccess,
  courses,
  categories,
}: CreateGroupFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      privacy: "public",
      maxMembers: 10,
      levelRequirement: 0,
      tags: [],
      courseId: "",
      categoryId: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      toast.success("Study group created!");
      router.refresh();
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>What is the name of the group?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                What is the description of the group?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Privacy</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="course-members">
                      Course Members
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                What is the privacy of the group?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course (Optional)</FormLabel>
                <FormControl>
                  <Combobox
                    options={courses.map((course) => ({
                      label: course.title,
                      value: course.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Associate this group with a specific course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category (Optional)</FormLabel>
                <FormControl>
                  <Combobox
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Choose a category for this group
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="maxMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Members</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={2}
                  max={100}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                Maximum number of members (2-100)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="levelRequirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level Requirement</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={userLevel}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                Minimum level required to join (0-{userLevel})
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  maxTags={5}
                />
              </FormControl>
              <FormDescription>
                Add up to 5 tags to help others find your group
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating group..." : "Create Group"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateGroupForm;
