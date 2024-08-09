import React from 'react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background">
      <Link href="/" className="text-2xl font-bold">
        LMS Logo
      </Link>
      <div className="flex gap-4">
        <Link href="/about" className={cn(buttonVariants({ variant: "ghost" }))}>
          About
        </Link>
        <Link href="/sign-in" className={cn(buttonVariants({ variant: "default" }))}>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
