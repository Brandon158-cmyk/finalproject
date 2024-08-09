import { auth, clerkClient, UserButton } from "@clerk/nextjs";
import NavbarRoutesClient from "./NavbarRoutesClient";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

const NavbarRoutes = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);
  const xp: any = user.publicMetadata.xp || 0;

  return (
    <div className="flex gap-x-2 ml-auto items-center justify-end w-full">
      <NavbarRoutesClient />
      <div className="flex items-center justify-center bg-secondary rounded-sm py-2 px-2 pl-4">
        <div className="flex items-center gap-1 pr-2 text-sm">
          <Star className="text-[#11DD7B] w-4 h-4 fill-[#11DD7B]" />
          {xp}
        </div>
        <div className="flex items-center gap-2 pl-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default NavbarRoutes;
