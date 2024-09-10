import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/MainPageNavbar";
import MainBg from "../assets/images/online.jpg";
import Banner from "./(main)/(dashboard)/search/_components/Banner";

const Page = async () => {
  const { userId } = auth();
  const userCount = await clerkClient.users.getCount();
  return (
    <div className="flex flex-col min-h-screen gap-8 bg-white ">
      <div>
        <Navbar />
      </div>
      <div className="mt-2 px-2 mb-6">
        <div className="w-full text-[#2A2B2E] p-6 max-w-screen-xl mx-auto rounded-xl flex justify-between overflow-hidden relative h-[700px]">
          {" "}
          <div className="flex items-center justify-between z-10 pr-8 h-full">
            <div className="max-w-[50%]">
              <h2 className="text-6xl font-bold mb-4">
                Are You Ready To <span className="text-pink-500">Elevate</span>{" "}
                Your <span className="text-sky-700">Learning</span> Experience?
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Access your courses anytime, anywhere with our mobile-friendly
                platform. Whether you are commuting, traveling, or just on the
                go, your learning journey continues seamlessly.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link
                  href="/search"
                  className="bg-sky-400 text-[#2A2B2E] border border-[#2A2B2E]/50 px-6 py-2 text-sm rounded-full hover:bg-sky-600 transition duration-300"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-green-200 text-[#2A2B2E] border border-[#2A2B2E]/50 text-sm px-6 py-2 rounded-full hover:bg-green-400 transition duration-300"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[55%] h-full">
            {" "}
            <Image
              src={MainBg}
              alt="Product Manager illustration"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
