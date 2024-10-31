"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateGroupForm from "./CreateGroupForm";

interface CreateGroupButtonProps {
  userLevel: number;
  courses: {
    id: string;
    title: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
}

const CreateGroupButton = ({
  userLevel,
  courses,
  categories,
}: CreateGroupButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Study Group</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Study Group</DialogTitle>
        </DialogHeader>
        <CreateGroupForm
          userLevel={userLevel}
          courses={courses}
          categories={categories}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupButton;
