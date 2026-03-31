import {
  BusFront,
  CalendarHeart,
  CarFront,
  Plane,
  UserRound,
} from "lucide-react";
import { BookingDetails, BookingSchedule, BookingStatus } from "./types";

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

const generateBookingId = () => {
  return `BK-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
};

export const now = () => new Date().toISOString();

const calculateStatus = (schedule?: BookingSchedule): BookingStatus => {
  const current = new Date();

  if (schedule?.type === "daily") {
    const pickup = new Date(schedule.pickupDate);
    const dropoff = new Date(schedule.dropoffDate);
    if (current < pickup) return "confirmed";
    if (current > dropoff) return "past";
    return "ongoing";
  }

  if (schedule?.type === "hourly") {
    const start = new Date(`${schedule.date}T${schedule.startTime}`);
    const totalHours = schedule.hours;
    const end = new Date(start.getTime() + totalHours * 60 * 60 * 1000);
    if (current < start) return "confirmed";
    if (current > end) return "past";
    return "ongoing";
  }

  return "draft";
};

const STORAGE_KEY = "bookings";

export const loadBookings = (): BookingDetails[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const bookings: BookingDetails[] = JSON.parse(raw);
    // Recalculate statuses on load — time may have passed since last session
    return bookings.map((b) =>
      b.status === "cancelled"
        ? b
        : { ...b, status: calculateStatus(b.schedule ?? undefined) },
    );
  } catch {
    return [];
  }
};

export const persistVerifiedBookings = (bookings: BookingDetails[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};
