import { auth, clerkClient, UserButton } from "@clerk/nextjs";
import NavbarRoutesClient from "./NavbarRoutesClient";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { MdStars } from "react-icons/md";

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
      <div className='flex items-center justify-center rounded-none py-2 px-2 pl-2'>
        <div className='flex items-center gap-1 pr-2 text-sm text-[#2A2B2E]'>
          <MdStars className='w-5 h-5 text-green-700 animate-pulse' />
          <div className='flex items-center justify-center gap-1'>
            {xp} <p>Points</p>
          </div>
        </div>
        <div className='bg-[#2A2B2E] py-2 px-4 flex items-center gap-2 rounded-full'>
          <span className='text-sm text-white font-bold'>{userName}</span>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: "w-6 h-6 ring-2 ring-[#FFEEEB]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarRoutes;
