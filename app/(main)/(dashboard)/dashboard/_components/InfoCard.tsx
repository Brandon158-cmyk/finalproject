import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: any;
  nameOfItems: string;
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  nameOfItems,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="bg-transparent border rounded-sm flex items-center gap-x-2 p-3 xl:gap-x-4 xl:px-5 xl:py-4">
      <Icon className="text-primary" />
      <div>
        <p className="font-medium text-primary">{label}</p>
        <p className="text-slate-500 text-sm">
          {numberOfItems} {nameOfItems}
        </p>
      </div>
    </div>
  );
};
