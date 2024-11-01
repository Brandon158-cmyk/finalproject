import { GroupWithDetails } from "@/lib/types/group";
import GroupCard from "./GroupCard";

interface GroupListProps {
  items: GroupWithDetails[];
  userLevel: number;
  userId: string;
}

const GroupList = ({ items, userLevel, userId }: GroupListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          userLevel={userLevel}
          userId={userId}
        />
      ))}
      {items.length === 0 && (
        <div className="col-span-full text-center p-6 bg-secondary rounded-lg">
          <p className="text-muted-foreground">No study groups found</p>
        </div>
      )}
    </div>
  );
};

export default GroupList;
