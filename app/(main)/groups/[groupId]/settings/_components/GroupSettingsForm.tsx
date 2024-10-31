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
import { Textarea } from "@/components/ui/textarea";
import TagInput from "@/app/(main)/groups/_components/TagInput";
import Combobox from "@/components/ui/combox";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  privacy: z.enum(["public", "private"]),
  maxMembers: z.number().min(2).max(100),
  levelRequirement: z.number().min(0),
  courseId: z.string().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()),
});

interface GroupSettingsFormProps {
  group: any; // Replace with proper type
  courses: { id: string; title: string }[];
  categories: { id: string; name: string }[];
}

const GroupSettingsForm = ({
  group,
  courses,
  categories,
}: GroupSettingsFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group.name,
      description: group.description,
      privacy: group.privacy,
      maxMembers: group.maxMembers,
      levelRequirement: group.levelRequirement,
      courseId: group.courseId || "",
      categoryId: group.categoryId || "",
      tags: group.tags || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/groups/${group.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();

      toast.success("Group settings updated");
      router.refresh();
      router.push(`/groups/${group.id}`);
    } catch {
      toast.error("Failed to update group settings");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Combobox
                    options={courses.map((course) => ({
                      label: course.title,
                      value: course.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Combobox
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  />
                </FormControl>
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
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
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
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit">Save Changes</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/groups/${group.id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GroupSettingsForm;
