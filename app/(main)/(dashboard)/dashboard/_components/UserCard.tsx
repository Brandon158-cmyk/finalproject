import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import { redirect } from "next/navigation";
import { ChangeAvatarDialog } from "@/components/ChangeAvatar";
import { avatarDecorations } from "@/config/avatar-decorations";
import { calculateLevel, getNextLevelXP } from "@/lib/xp-utils";
import XPProgress from "@/components/XPProgress";

const calculateProgress = (current: number, total: number) => {
  return (current / total) * 100;
};

const removeHundreds = (xp: number) => {
  return xp % 100;
};

const getHundreds = (xp: number) => {
  return Math.floor(xp / 100) * 100;
};

const UserCard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  const userName = user.username || user.firstName || "User";
  const xp = (user.publicMetadata.xp as number) || 0;
  const level = calculateLevel(xp);
  const nextLevelXP = getNextLevelXP(xp);

  // Image handling remains the same
  const image = (user.publicMetadata.image as string) || "";
  const [groupName, indexString] = image.split("-");
  const index = Number(indexString);
  const matchingDecoration = avatarDecorations.find(
    (decoration) => decoration.title === groupName
  );
  let imageURL = matchingDecoration?.images[index] || "";

  return (
    <div className="bg-gradient-to-br from-[#2A2B2E] to-[#1F2023] p-6 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Left Section - Avatar and User Info */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-white/20 transition-all">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1&ipt=88b85dc2f8a0ebacc9770b247d375e3432e8b0e5436f77376ac858f296df6157&ipo=images"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {imageURL && (
                <img
                  src={imageURL}
                  alt="decoration"
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
            <ChangeAvatarDialog />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {userName}
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                Level {level}
              </span>
              <span className="text-white/60 text-sm">{xp} XP Total</span>
            </div>
          </div>
        </div>

        {/* Right Section - XP Progress */}
        <div className="flex-1 w-full">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Progress to Level {level + 1}</span>
              <span>{Math.round((xp / nextLevelXP) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#11DD7B] to-[#00FF8C] transition-all duration-300"
                style={{
                  width: `${(removeHundreds(xp) / 100) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              className="bg-white/10 hover:bg-white/20 text-white border-none"
              variant="outline"
            >
              <span>Watch Chapters (+10 XP)</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="bg-white/5 hover:bg-white/10 text-white/60 border-none"
              variant="outline"
              disabled
            >
              <span>Complete Quiz (+50 XP)</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
