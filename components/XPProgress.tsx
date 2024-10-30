import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  level: number;
  nextLevelXP: number;
}

const XPProgress = ({ currentXP, level, nextLevelXP }: XPProgressProps) => {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-blue-500" />
          <span>{currentXP} XP</span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>{currentXP} XP</span>
        <span>{nextLevelXP} XP</span>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Award className="h-4 w-4 text-purple-500" />
          Next Rewards
        </h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Unlock special course content at Level {level + 1}</li>
          <li>• Earn &quot;{level + 1}&quot; badge for your profile</li>
          <li>• Access to exclusive community features</li>
        </ul>
      </div>
    </div>
  );
};

export default XPProgress;
