import { CalendarHeart, CarFront, Plane, UserRound } from "lucide-react";
import { BookingDetails, BookingSchedule, BookingStatus, Car } from "./types";

export const calculateDays = (
  start: Date | null | string,
  end: Date | null | string,
) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(
    new Date(end).getTime() - new Date(start).getTime(),
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const Icon = {
  weddings_and_events: CalendarHeart,
  corporate_and_executive_use: UserRound,
  airport_transfers: Plane,
  city_tours_and_group_trips: CarFront,
  self_drive: UserRound,
};

export const getScheduleRange = (schedule: BookingSchedule) => {
  if (schedule.type === "daily") {
    return {
      start: new Date(schedule.pickupDate).getTime(),
      end: new Date(schedule.dropoffDate).getTime(),
    };
  }

  // Hourly normalization
  const startTime = new Date(
    `${schedule.date}T${schedule.startTime}`,
  ).getTime();
  const endTime = startTime + schedule.hours * 60 * 60 * 1000;

  return { start: startTime, end: endTime };
};

/**
 * Checks if two booking schedules occupy the same time slot.
 * Returns true if there is a conflict (overlap).
 */
export const isScheduleOverlapping = (
  requestedSchedule: BookingSchedule,
  existingSchedule: BookingSchedule,
) => {
  const newRange = getScheduleRange(requestedSchedule);
  const alreadyBookedRange = getScheduleRange(existingSchedule);

  // A conflict exists if the new start is before their end
  // AND their start is before the new end.
  return (
    newRange.start < alreadyBookedRange.end &&
    alreadyBookedRange.start < newRange.end
  );
};

export const isCarAvailable = (
  car: Car,
  bookings: BookingDetails[],
  schedule?: BookingSchedule | null,
) => {
  if (!schedule) return true;
  const validBookings = bookings.filter(
    (bookingData) =>
      (bookingData.status === "confirmed" ||
        bookingData.status === "ongoing") &&
      bookingData.selectedCars.find((bookedCar) => bookedCar.id === car.id),
  );

  return validBookings.every((bookingData) => {
    if (bookingData.schedule) {
      return !isScheduleOverlapping(schedule, bookingData.schedule);
    }
    return true;
  });
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
      b.status === "cancelled" || b.status === null || b.status === "draft"
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

export const calculatePrice = (booking: BookingDetails) => {
  if (booking.service.pricing === "hourly") {
    const bookingSchedule =
      booking.schedule?.type === "hourly" && booking.schedule;

    if (bookingSchedule) {
      const totalHours = bookingSchedule?.hours;
      const totalPrice = booking.selectedCars
        .map((car) => car.pricePerHour)
        .reduce((acc, price) => acc + price, 0);
      return totalPrice * totalHours;
    }
  }
  const bookingSchedule =
    booking.schedule?.type === "daily" && booking.schedule;
  if (bookingSchedule) {
    const days = calculateDays(
      bookingSchedule?.pickupDate,
      bookingSchedule?.dropoffDate,
    );
    const totalPrice = booking.selectedCars
      .map((car) => car.pricePerDay)
      .reduce((acc, price) => acc + price, 0);
    return totalPrice * days;
  }
  return 0;
};

export const formatDateForInput = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return getLocalDateString(date);
  } catch {
    return "";
  }
};

export const getLocalDateString = (d: Date | null) => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
