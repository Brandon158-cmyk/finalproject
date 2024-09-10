import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import { redirect } from "next/navigation";
import { ChangeAvatarDialog } from "@/components/ChangeAvatar";
import { avatarDecorations } from "@/config/avatar-decorations";

const UserCard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  const userName = user.username || user.firstName || "User";

  // XP
  const xp = (user.publicMetadata.xp as number) || 0;
  function getHundreds(number: number) {
    return Math.floor(number / 100) * 100;
  }
  function removeHundreds(number: number): number {
    return number % 100;
  }
  function calculateProgress(currentValue: number, totalValue: number) {
    return Math.round((currentValue / totalValue) * 100);
  }

  // Image
  const image = (user.publicMetadata.image as string) || "";
  const [groupName, indexString] = image.split("-");
  const index = Number(indexString);
  const matchingDecoration = avatarDecorations.find(
    (decoration) => decoration.title === groupName,
  );
  let imageURL = "";
  if (matchingDecoration) {
    imageURL = matchingDecoration.images[index];
  }

  return (
    <div className="bg-[#2A2B2E] gap-6 xl:gap-0 flex flex-col xl:flex-row p-6">
      <div className="flex gap-6 items-center flex-1">
        <div className="flex flex-col gap-4 w-full pr-6">
          <h1 className="font-bold text-white sm:text-xl lg:text-3xl">
            {userName}
          </h1>
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full w-full bg-[#11DD7B]/25">
              <div
                className="h-2 rounded-full bg-[#00FF8C]"
                style={{
                  width: `${calculateProgress(removeHundreds(xp), 100)}%`,
                }}
              ></div>
            </div>
            <div className="text-white flex justify-between items-center">
              <button>{`${xp} `}XP</button>
              <span className="text-white">{getHundreds(xp) + 100} XP</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center flex-1">
        <Button
          className="w-full rounded-full p-6 bg-white border-border flex justify-between hover:!scale-[1.01]"
          variant={"outline"}
        >
          <span>Earn 10 XP for watching one chapter</span>
          <ArrowRight className="hidden sm:block" />
        </Button>
        <Button
          className="w-full rounded-full p-6 bg-white border-border flex justify-between hover:!scale-[1.01] animate-pulse cursor-not-allowed"
          disabled
          variant={"outline"}
        >
          <span>Earn 50 XP for solving a Quiz </span>
          <ArrowRight className="hidden sm:block" />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
