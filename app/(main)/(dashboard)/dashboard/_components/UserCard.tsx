import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { calculateLevel, getNextLevelXP } from "@/lib/xp-utils";
import { avatarDecorations } from "@/config/avatar-decorations";
import UserCardClient from "./UserCardClient";

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

  // Image handling
  const image = (user.publicMetadata.image as string) || "";
  const [groupName, indexString] = image.split("-");
  const index = Number(indexString);
  const matchingDecoration = avatarDecorations.find(
    (decoration) => decoration.title === groupName
  );
  const imageURL = matchingDecoration?.images[index] || "";

  return (
    <UserCardClient
      userName={userName}
      xp={xp}
      level={level}
      nextLevelXP={nextLevelXP}
      imageURL={imageURL}
    />
  );
};

export default UserCard;
