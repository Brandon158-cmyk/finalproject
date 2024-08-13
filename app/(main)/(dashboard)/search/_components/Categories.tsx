"use client";

import { Category } from "@prisma/client";
import React from "react";

import { IconType } from "react-icons";
import {
  FaCode,
  FaLaptopCode,
  FaMicrochip,
  FaMobileScreenButton,
  FaPaintbrush,
} from "react-icons/fa6";
import CategoryItem from "./CategoryItem";

const IconMap: Record<string, IconType> = {
  Programming: FaCode,
  "Web Development": FaLaptopCode,
  Electronics: FaMicrochip,
  "Mobile App Development": FaMobileScreenButton,
  Design: FaPaintbrush,
};

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto py-3 px-3 bg-white md:rounded-sm md:rounded-sm container mx-auto">
      {items.map((category) => (
        <CategoryItem
          key={category.id}
          label={category.name}
          value={category.id}
          icon={IconMap[category.name]}
        />
      ))}
    </div>
  );
};

export default Categories;
