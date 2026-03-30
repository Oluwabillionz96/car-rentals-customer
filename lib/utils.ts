import { BusFront, CalendarHeart, CarFront, Plane, UserRound } from "lucide-react";

export const calculateDays = (start: Date | null, end: Date | null) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(
    new Date(end).getTime() - new Date(start).getTime(),
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const Icon = {
  wedding: CalendarHeart,
  executive: UserRound,
  airport_transfers: Plane,
  city_tours: CarFront,
  group_trips: BusFront,
  self_drive: UserRound,
};
