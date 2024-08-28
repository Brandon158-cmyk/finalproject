import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType | LucideIcon;
  label: string;
  href: string;
  isCollapsed?: boolean;
}

const SidebarItem = ({
  isCollapsed,
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <Button
      asChild
      variant={"ghost"}
      size={"default"}
      className={cn(
        "bg-transparent flex items-center justify-start gap-x-2 px-6 py-2 text-[#2A2B2E] text-sm mx-1 !rounded-full overflow-hidden transition-all duration-300 rounded-full hover:scale-1 group",
        isActive
          ? "bg-slate-200 font-bold text-[#2A2B2E] opacity-100 hover:bg-white hover:text-[#2A2B2E]"
          : ""
      )}
    >
      <Link href={href}>
        <span
          className={cn(
            "p-[3px] rounded-none transition-all duration-300",
            isActive
              ? "bg-transparent group-hover:bg-[#FFEEEB]/5 text-[#2A2B2E]"
              : "bg-transparent text-neutral-400 group-hover:text-foreground"
          )}
        >
          <Icon className='w-5 h-5' />
        </span>
        {!isCollapsed && label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
