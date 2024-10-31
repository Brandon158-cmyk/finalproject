"use client";

import { GroupWithDetails } from "@/lib/types/group";
import { Button } from "@/components/ui/button";
import { calculateLevel } from "@/lib/xp-utils";
import { Users, BookOpen, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GroupCardProps {
  group: GroupWithDetails;
  userLevel: number;
  userId: string;
}

const GroupCard = ({ group, userLevel, userId }: GroupCardProps) => {
  const router = useRouter();
  const isLocked = userLevel < group.levelRequirement;
  const isFull = group.members.length >= group.maxMembers;
  const tags = group.tags || [];
  const isMember = group.members.some((member) => member.userId === userId);

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

  const handleClick = () => {
    if (isMember) {
      router.push(`/groups/${group.id}`);
    } else {
      handleJoin();
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border p-4 hover:shadow-md transition",
        isLocked && "opacity-75"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{group.name}</h3>
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </div>
        {isLocked && (
          <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">
            Requires Level {group.levelRequirement}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {group.course && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4" />
            <span>{group.course.title}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <span>
            {group.members.length} / {group.maxMembers} members
          </span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-xs"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </div>
            ))}
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleClick}
          disabled={!isMember && (isLocked || isFull)}
          variant={isLocked ? "secondary" : "default"}
        >
          {isMember
            ? "View Group"
            : isLocked
            ? "Level Locked"
            : isFull
            ? "Group Full"
            : "Join Group"}
        </Button>
      </div>
    </div>
  );
};

export default GroupCard;
