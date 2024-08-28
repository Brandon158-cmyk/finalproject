"use client";

import { Category } from "@prisma/client";
import React from "react";

import { IconType } from "react-icons";
import {
  SiJavascript,
  SiReact,
  SiArduino,
  SiFlutter,
  SiAdobecreativecloud,
} from "react-icons/si";
import CategoryItem from "./CategoryItem";

const IconMap: Record<string, IconType> = {
  Programming: SiJavascript,
  "Web Development": SiReact,
  Electronics: SiArduino,
  "Mobile App Development": SiFlutter,
  Design: SiAdobecreativecloud,
};

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto py-3 px-3 md:rounded-xl container mx-auto'>
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
