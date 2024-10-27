import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  position: number;
  username: string;
  avatar: string;
  decoration: string;
  level: number;
  enrolledCourses: number;
  completedCourses: number;
  points: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Position</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead>Enrolled Courses</TableHead>
          <TableHead>Completed Courses</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.username}>
            <TableCell>
              {entry.position <= 3 ? (
                <div className="flex items-center gap-2">
                  {entry.position === 1 && "🥇"}
                  {entry.position === 2 && "🥈"}
                  {entry.position === 3 && "🥉"}
                  {entry.position}
                </div>
              ) : (
                entry.position
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Image
                    src={entry.avatar}
                    alt={entry.username}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  {entry.decoration && (
                    <Image
                      src={entry.decoration}
                      alt="decoration"
                      width={32}
                      height={32}
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
                <span className="font-medium">{entry.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  Lvl {entry.level}
                </div>
              </div>
            </TableCell>
            <TableCell>{entry.enrolledCourses}</TableCell>
            <TableCell>{entry.completedCourses}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{entry.points}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
