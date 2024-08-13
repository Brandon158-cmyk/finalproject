"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const NavbarRoutesClient = () => {
  const pathname = usePathname();
  const isTecacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isTecacherPage || isPlayerPage ? (
        <Button className="rounded-sm" variant={"outline"} asChild>
          <Link href="/search">
            <LogOut className="font-bold h-4 w-4 mr-2" />
            Exit
          </Link>
        </Button>
      ) : null}
    </>
  );
};

export default NavbarRoutesClient;
