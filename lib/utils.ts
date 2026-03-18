export const calculateDays = (start: Date | null, end: Date | null) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
