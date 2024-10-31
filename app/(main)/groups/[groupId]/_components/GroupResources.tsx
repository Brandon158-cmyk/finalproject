"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, File, Plus, ExternalLink, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Resource {
  id: string;
  title: string;
  type: "file" | "link";
  url: string;
  createdAt: string;
  userId: string;
}

interface GroupResourcesProps {
  groupId: string;
  isMember: boolean;
  isAdmin: boolean;
  resources: Resource[];
}

const GroupResources = ({
  groupId,
  isMember,
  isAdmin,
  resources,
}: GroupResourcesProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"file" | "link">("link");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/groups/${groupId}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, type }),
      });

      if (!response.ok) throw new Error();

      toast.success("Resource added");
      setIsOpen(false);
      setTitle("");
      setUrl("");
      router.refresh();
    } catch {
      toast.error("Failed to add resource");
    }
  };

  const handleDelete = async (resourceId: string) => {
    try {
      const response = await fetch(
        `/api/groups/${groupId}/resources/${resourceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Resource deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete resource");
    }
  };

  if (!isMember) return null;

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Resources</h2>
        {isMember && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Resource</DialogTitle>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={type === "link" ? "default" : "outline"}
                    onClick={() => setType("link")}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Link
                  </Button>
                  <Button
                    type="button"
                    variant={type === "file" ? "default" : "outline"}
                    onClick={() => setType("file")}
                  >
                    <File className="h-4 w-4 mr-2" />
                    File
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Add Resource
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="space-y-2">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary"
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {resource.type === "link" ? (
                <Link className="h-4 w-4" />
              ) : (
                <File className="h-4 w-4" />
              )}
              <span>{resource.title}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(resource.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupResources;
