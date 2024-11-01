"use client";

import { GroupWithDetails } from "@/lib/types/group";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Tag, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GroupHeaderProps {
  group: GroupWithDetails;
  isAdmin: boolean;
  isMember: boolean;
  userLevel: number;
}

const GroupHeader = ({
  group,
  isAdmin,
  isMember,
  userLevel,
}: GroupHeaderProps) => {
  const router = useRouter();
  const isLocked = userLevel < group.levelRequirement;
  const isFull = group.members.length >= group.maxMembers;

  const handleJoin = async () => {
    try {
      const response = await fetch(`/api/groups/${group.id}/join`, {
        method: "POST",
      });

      if (!response.ok) throw new Error();

      toast.success("Successfully joined the group!");
      router.refresh();
    } catch {
      toast.error("Failed to join group");
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
          <p className="text-muted-foreground mb-4">{group.description}</p>

          <div className="flex flex-wrap gap-4">
            {group.course && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{group.course.title}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {group.members.length} / {group.maxMembers} members
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {isAdmin ? (
            <Button onClick={() => router.push(`/groups/${group.id}/settings`)}>
              <Settings className="h-4 w-4 mr-2" />
              Manage Group
            </Button>
          ) : (
            !isMember && (
              <Button
                onClick={handleJoin}
                disabled={isLocked || isFull}
                variant={isLocked ? "secondary" : "default"}
              >
                {isLocked
                  ? "Level Locked"
                  : isFull
                  ? "Group Full"
                  : "Join Group"}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
