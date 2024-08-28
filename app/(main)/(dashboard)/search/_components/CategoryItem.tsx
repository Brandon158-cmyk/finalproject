"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm rounded-full flex items-center gap-x-2 transition-all duration-300 ease-in-out",
        isSelected
          ? "border-primary/90 bg-primary/75 text-primary-foreground"
          : "hover:bg-accent/50 hover:text-accent-foreground",
        "border border-transparent hover:border-primary/20"
      )}
      type='button'
    >
      {Icon && <Icon className='w-4 h-4' />}
      <div className='truncate'>{label}</div>
    </button>
  );
};

export default CategoryItem;
