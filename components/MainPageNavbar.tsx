import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="fixed border border-b-[#2A2B2E]/30 top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex p-4 justify-between items-center">
          <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
            <div className="!h-9 p-1 !w-9 !aspect-square bg-[#2A2B2E] rounded-full text-lg lg:text-xl flex items-center justify-center !text-white">
              P
            </div>
            <div className="flex font-bold text-[#2A2B2E] text-lg md:text-xl items-center gap-1">
              Punzila
            </div>
          </h1>{" "}
          {/* Make sure it covers the full height */}
        </div>
        <div className="flex items-center gap-x-8 ml-auto justify-end">
          <div className="flex gap-x-4 items-center text-md">
            <Link href="/teacher/courses">Courses</Link>
            <Link href="/teacher/courses">Dashboard</Link>
            <Link href="/teacher/courses">Leader Boards</Link>
            <Link href="/teacher/courses">About</Link>
            <Link href="/teacher/courses">Become A Teacher</Link>
          </div>
          <div>
            <Link
              href="/teacher/courses"
              className="bg-pink-400 text-[#2A2B2E] border border-[#2A2B2E]/50 px-6 py-2 text-sm rounded-full hover:bg-pink-600 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
