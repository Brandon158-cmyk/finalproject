import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaStar } from "react-icons/fa";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  image: string;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  currentUserId: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  currentUserId,
}) => {
  const currentUserRank =
    data.findIndex((entry) => entry.name === currentUserId) + 1;

  const getStarColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-[#11DD7B]";
    }
  };

  return (
    <>
      {currentUserRank > 0 && (
        <div className="bg-primary/10 p-4 rounded-sm mb-4">
          <h2 className="text-2xl font-semibold mb-2">Your Ranking</h2>
          <p>
            You are currently ranked{" "}
            <span className="font-bold text-primary">{currentUserRank}</span>{" "}
            with{" "}
            <span className="font-bold text-primary">
              {data[currentUserRank - 1].xp} XP
            </span>
            .
          </p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">XP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry) => (
            <TableRow
              key={entry.rank}
              className={entry.name === currentUserId ? "bg-accent/30" : ""}
            >
              <TableCell className="font-medium">
                <FaStar className={`inline mr-2 ${getStarColor(entry.rank)}`} />
                {entry.rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Image
                    src={entry.image}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <span>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{entry.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LeaderboardTable;
