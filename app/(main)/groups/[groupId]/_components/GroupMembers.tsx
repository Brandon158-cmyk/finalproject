"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Crown, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Member {
  userId: string;
  role: "admin" | "moderator" | "member";
  name: string;
  avatar: string;
  level: number;
}

interface GroupMembersProps {
  members: Member[];
  isAdmin: boolean;
  groupId: string;
}

const roleIcons = {
  admin: Crown,
  moderator: Shield,
  member: User,
};

const GroupMembers = ({ members, isAdmin, groupId }: GroupMembersProps) => {
  const router = useRouter();

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const response = await fetch(
        `/api/groups/${groupId}/members/${memberId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Member role updated");
      router.refresh();
    } catch {
      toast.error("Failed to update member role");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(
        `/api/groups/${groupId}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Member removed from group");
      router.refresh();
    } catch {
      toast.error("Failed to remove member");
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Members</h2>
      <div className="space-y-4">
        {members.map((member) => {
          const RoleIcon = roleIcons[member.role];
          return (
            <div
              key={member.userId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RoleIcon className="h-3 w-3" />
                    <span className="capitalize">{member.role}</span>
                    <span>• Level {member.level}</span>
                  </div>
                </div>
              </div>
              {isAdmin && member.role !== "admin" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        handleRoleChange(member.userId, "moderator")
                      }
                    >
                      Make Moderator
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRemoveMember(member.userId)}
                      className="text-destructive"
                    >
                      Remove from Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupMembers;
