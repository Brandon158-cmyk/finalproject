"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaBarsProgress, FaMoneyBill, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoIosAnalytics } from "react-icons/io";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";

interface CourseCardSmallProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  progress: number | null;
  category?: string;
  author: string;
  chaptersLength: number;
  enrollmentCount: number;
}

const CourseCardSmall = ({
  id,
  title,
  imageUrl,
  price,
  progress,
  category,
  author,
  description,
  chaptersLength,
  enrollmentCount,
}: CourseCardSmallProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="flex flex-col bg-white border border-gray-200 rounded-[0.5rem] max-w-[300px] h-[350px] shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
        <div className="w-full h-[150px] relative">
          <div className="w-full h-full overflow-hidden rounded-tr-[0.5rem] rounded-tl-[0.5rem]">
            <CldImage
              aspectRatio="video"
              src={imageUrl}
              alt="course image"
              width={300}
              height={150}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-1 rounded-[0.2rem]">
            {enrollmentCount} {enrollmentCount === 1 ? "Student" : "Students"}
          </div>
        </div>
        <div className="flex flex-col flex-grow p-4 justify-between">
          <div>
            <h3 className="text-md text-[#2A2B2E] font-semibold line-clamp-2 mb-1">
              {title.length > 50 ? `${title.substring(0, 50)}...` : title}
            </h3>
            <p className="line-clamp-2 text-xs text-gray-500 mb-1">
              {description.length > 100
                ? `${description.substring(0, 100)}...`
                : description}
            </p>
            <div className="flex flex-wrap items-center gap-x-2 mb-1 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <PiChalkboardTeacherDuotone className="h-3 w-3" />
                <span className="font-bold text-[#2A2B2E]">{author}</span>
              </div>
              {category && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span className="text-[#2A2B2E]">{category}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-auto">
            {progress !== null ? (
              <div className="flex items-center gap-1 mb-2">
                <FaBarsProgress className="h-3 w-3 text-gray-500" />
                <div className="flex-grow bg-gray-200 h-1 rounded-full">
                  <div
                    className="h-full bg-[#151619] rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mb-2">
                <FaBarsProgress className="h-3 w-3 text-gray-500" />
                <p className="text-xs text-gray-500">
                  <span className="text-gray-600 font-semibold">
                    Not Enrolled
                  </span>
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <FaMoneyBill1Wave className="h-3 w-3" />

                <p
                  className={`text-sm ${
                    price === 0 ? "text-green-600" : "text-sky-600"
                  } font-semibold`}
                >
                  {price === 0 ? "Free" : `K${price}`}
                </p>
              </div>
              <div className="text-xs border border-gray-300 px-2 py-1 rounded-[0.2rem]">
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCardSmall;
