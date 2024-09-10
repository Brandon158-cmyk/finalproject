import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: any;
  nameOfItems: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}

export const InfoCard = ({
  nameOfItems,
  icon: Icon,
  numberOfItems,
  label,
  className,
}: InfoCardProps) => {
  return (
    <div className="bg-transparent border rounded-xl flex items-center gap-x-2 p-3 xl:gap-x-4 xl:px-5 xl:py-4 hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
      <Icon className="text-white fill-green-700" />
      <div>
        <p className="font-bold text-white">{label}</p>
        <p className="text-white text-sm">
          {numberOfItems} {nameOfItems}
        </p>
      </div>
    </div>
  );
};
