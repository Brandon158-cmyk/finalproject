"use client";

import { ArrowLeft, BarChart, Compass, List, Plus, Group, Pencil, } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

const guestRoutes = [
  {
    icon: PiStudent,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/search",
  },
  {
    icon: MdOutlineLeaderboard,
    label: "Leaderboard",
    href: "/rankings",
  },
{
    icon: Group,
    label: "Groups",
    href: "/groups",
  },
   {
    icon: Pencil,
    label: "Quiz",
    href: "/quiz",
  },
];
const teacherRoutes = [
  {
    icon: ArrowLeft,
    label: "Student Dashboard",
    href: "/dashboard",
  },
  {
    icon: Plus,
    label: "Create a Course",
    href: "/teacher/create",
  },
  {
    icon: List,
    label: "My Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

interface SidebarRoutesProps {
  isCollapsed: boolean;
}

interface RouteType {
  icon: IconType | LucideIcon;
  label: string;
  href: string;
}

const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ isCollapsed }) => {
  const pathname = usePathname();
  const isTecacherPage = pathname?.includes("/teacher");
  const routes = isTecacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className={cn("flex flex-col w-full py-6 gap-2")}>
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
