import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ChangeAvatarDialog } from "@/components/ChangeAvatar";
import Link from "next/link";

interface UserCardClientProps {
  userName: string;
  xp: number;
  level: number;
  nextLevelXP: number;
  imageURL: string;
}

const UserCardClient = ({
  userName,
  xp,
  level,
  nextLevelXP,
  imageURL,
}: UserCardClientProps) => {
  const removeHundreds = (num: number) => num % 100;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Left Section - Avatar and Name */}
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1&ipt=88b85dc2f8a0ebacc9770b247d375e3432e8b0e5436f77376ac858f296df6157&ipo=images"
            alt="avatar"
            className="w-full h-full rounded-full"
          />
          <img
            src={imageURL}
            alt="decoration"
            className="absolute top-0 right-0 w-full h-full"
          />
          <ChangeAvatarDialog />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{userName}</h2>
          <p className="text-white/80">Level {level}</p>
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
            <Link href="/search">
              <span>Watch Chapters (+10 XP)</span>
            </Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            className="bg-white/10 hover:bg-white/20 text-white border-none"
            variant="outline"
          >
            <Link href="/quiz">
              <span>Take a Quiz (+50 XP)</span>
            </Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCardClient;
