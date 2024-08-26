import { auth, clerkClient, UserButton } from "@clerk/nextjs";
import NavbarRoutesClient from "./NavbarRoutesClient";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

const NavbarRoutes = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);
  const xp: any = user.publicMetadata.xp || 0;
  const userName = user.username || user.firstName || "User";

  return (
    <div className='flex gap-x-2 ml-auto items-center justify-end w-full'>
      <NavbarRoutesClient />
      <div className='flex items-center justify-center rounded-sm py-2 px-2 pl-2'>
        <div className='flex items-center gap-1 pr-2 text-sm text-primary font-medium'>
          <Star className='text-primary w-4 h-4 fill-[#11DD7B]' />
          {xp} <p>Points</p>
        </div>
        <div className='bg-primary bg-sm py-1 px-2 flex items-center gap-2 pl-2'>
          <span className='text-sm text-white font-medium'>{userName}</span>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default NavbarRoutes;
