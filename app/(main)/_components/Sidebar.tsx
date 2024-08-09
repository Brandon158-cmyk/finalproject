"use client";

import { Settings } from "lucide-react";
import SidebarRoutes from "./SidebarRoutes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = pathname === "/settings";

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-primary md:bg-primary w-[250px] border-r-2 border-white">
      {/* Logo */}
      <div className="flex p-4 justify-between items-center">
        <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
          <div className="!h-8 p-1 !w-8 !aspect-square bg-[#11DD7B] rounded-sm text-lg lg:text-xl flex items-center justify-center !text-primary">
            P
          </div>
          <div className="flex text-white text-lg md:text-xl items-center gap-1">
            <span>Punzila</span>
          </div>
        </h1>
      </div>
      <SidebarRoutes />
      <div className="flex flex-col justify-center items-center mt-auto mb-2 mx-3">
        <Button
          asChild
          variant={"ghost"}
          size={"lg"}
          className={cn(
            "bg-white/10 flex items-center justify-start w-full gap-x-3 px-4 py-[26px] text-white text-sm mx-3 !rounded-sm overflow-hidden font-[500] transition-all duration-300 rounded-none hover:scale-1 group",
            isActive
              ? "bg-[#11DD7B] text-primary opacity-100 hover:bg-white hover:text-primary"
              : ""
          )}
        >
          <Link href={"/settings"}>
            <span
              className={cn(
                "p-[6px] rounded-[6px] transition-all duration-300",
                isActive
                  ? "bg-white group-hover:bg-primary/5 text-primary"
                  : "bg-white text-primary group-hover:text-foreground"
              )}
            >
              <Settings className="w-5 h-5" />
            </span>
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
