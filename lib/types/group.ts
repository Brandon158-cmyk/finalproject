import { Course, Category } from "@prisma/client";

export type GroupPrivacy = "public" | "private" | "course-members";

export interface GroupMember {
  userId: string;
  role: "admin" | "moderator" | "member";
  joinedAt: Date;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  privacy: GroupPrivacy;
  courseId?: string;
  categoryId?: string;
  creatorId: string;
  members: GroupMember[];
  maxMembers: number;
  levelRequirement: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type GroupWithDetails = StudyGroup & {
  course?: Course;
  category?: Category;
  memberCount: number;
};
