"use client";
import { useState } from "react";
import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarRoutes from "./SidebarRoutes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === "/settings";

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col overflow-y-auto bg-white md:bg-white transition-all duration-300 border-r border-gray-300 px-2",
        isCollapsed ? "w-[70px]" : "w-[200px]"
      )}
    >
      {/* Toggle Button */}
      <div className="flex p-4 justify-between items-center">
        {!isCollapsed && (
          <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
            <div className="!h-8 p-1 !w-8 !aspect-square bg-[#2A2B2E] rounded-full text-md lg:text-lg flex items-center justify-center !text-white">
              P
            </div>
            <div className="flex text-[#2A2B2E] text-md md:text-lg items-center gap-1">
              Punzila
            </div>
          </h1>
        )}
        <Button
          variant={"default"}
          size={"icon"}
          className="text-[#2A2B2E] hidden md:flex bg-transparent ml-auto hover:bg-[#FFEEEB] hover:text-[#2A2B2E] text-sm rounded-full"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Sidebar Routes */}
      <SidebarRoutes isCollapsed={isCollapsed} />

      {/* Settings Button */}
      <div className="flex flex-col justify-center items-center mt-auto mb-2">
        <Button
          asChild
          variant={"ghost"}
          size={"default"}
          className={cn(
            "bg-transparent flex items-center justify-start gap-x-2 px-4 py-3 text-[#2A2B2E] text-sm mx-1 !rounded-full overflow-hidden transition-all duration-300 rounded-full hover:scale-1 group w-full",
            isActive
              ? "bg-[#FFEEEB] font-bold text-[#2A2B2E] opacity-100 hover:bg-white hover:text-[#2A2B2E]"
              : ""
          )}
        >
          <Link href={"/settings"}>
            <span
              className={cn(
                "p-[3px] rounded-none transition-all duration-300",
                isActive
                  ? "bg-transparent group-hover:bg-[#FFEEEB]/5 text-[#2A2B2E]"
                  : "bg-transparent text-neutral-400 group-hover:text-foreground"
              )}
            >
              <Settings className="w-5 h-5" />
            </span>
            {!isCollapsed && "Settings"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
