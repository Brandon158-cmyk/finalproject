import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardEntry {
  position: number;
  username: string;
  avatar: string;
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
          <TableHead>Position</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Enrolled Courses</TableHead>
          <TableHead>Completed Courses</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.username}>
            <TableCell>{entry.position}</TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <Image
                  src={entry.avatar}
                  alt={entry.username}
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                <span>{entry.username}</span>
              </div>
            </TableCell>
            <TableCell>{entry.enrolledCourses}</TableCell>
            <TableCell>{entry.completedCourses}</TableCell>
            <TableCell>{entry.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
