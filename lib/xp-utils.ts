export const calculateLevel = (xp: number): number => {
  // Each level requires 20% more XP than the previous
  let level = 1;
  let requiredXP = 100;

  while (xp >= requiredXP) {
    level++;
    requiredXP = Math.floor(requiredXP * 1.2);
  }

  return level;
};

export const getNextLevelXP = (currentXP: number): number => {
  let requiredXP = 100;

  while (currentXP >= requiredXP) {
    requiredXP = Math.floor(requiredXP * 1.2);
  }

  return requiredXP;
};

export const XP_REWARDS = {
  COMPLETE_CHAPTER: 10,
  COMPLETE_COURSE: 50,
  DAILY_LOGIN: 5,
  PERFECT_QUIZ_SCORE: 20,
  COURSE_REVIEW: 15,
  HELP_OTHERS: 10,
  STREAK_MILESTONE: 25,
} as const;
