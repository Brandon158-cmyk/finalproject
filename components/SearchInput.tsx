"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = ({ className }: { className?: string }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            categoryId: currentCategoryId,
            title: debouncedValue,
          },
        },
        { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
    }
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-[#2A2B2E]" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[500px] pl-9 bg-slate-200 focus-visible:ring-slate-100 rounded-full border border-[1px] border-sky-200"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
